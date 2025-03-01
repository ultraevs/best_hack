from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.db.models.order import Order
from app.db.models.lot import Lot
from app.api.v1.schemas.user import TokenData
from app.api.v1.schemas.order import OrderCreate, Order
from app.db.models.order import Order as bOrder
from app.db.models.lot import Lot

def create_order(db: Session, order: OrderCreate):
    lot = db.query(Lot).filter(Lot.id == order.lot_id).first()
    if not lot:
        raise HTTPException(status_code=404, detail="Lot not found")
    
    if order.volume > lot.available_volume:
        raise HTTPException(
            status_code=400,
            detail=f"Not enough fuel available. Available: {lot.available_volume}, requested: {order.volume}"
        )
    
    lot.available_volume -= order.volume

    lot.lot_price = lot.price_per_ton * lot.available_volume
    
    if lot.available_volume == 0:
        lot.status = "Продан"
    
    db_order = Order(**order.dict())
    db.add(db_order)
    
    db.commit()
    db.refresh(db_order)
    
    return db_order

def delete_order(order_id: int, db: Session, current_user: TokenData):
    order = db.query(bOrder).filter(bOrder.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if order.client_id != current_user.user_id:
        raise HTTPException(status_code=403, detail="You can only cancel your own orders")
    
    lot = db.query(Lot).filter(Lot.id == order.lot_id).first()
    if not lot:
        raise HTTPException(status_code=404, detail="Lot not found")
    
    lot.available_volume += order.volume
    
    db.delete(order)
    db.commit()
    
    return {"message": "Order cancelled successfully"}