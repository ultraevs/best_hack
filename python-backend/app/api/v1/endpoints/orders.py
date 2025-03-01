from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.order_service import create_order
from app.api.v1.schemas.user import TokenData
from app.core.security import decode_token
from app.api.v1.schemas.order import OrderCreate, Order
from app.db.models.order import Order as bOrder
from app.db.models.lot import Lot
from app.api.v1.schemas.lot import Lot as pLot

router = APIRouter()

@router.post("/orders/", response_model=Order)
def create_new_order(order: OrderCreate, db: Session = Depends(get_db)):
    return create_order(db=db, order=order)


@router.get("/user/orders/", response_model=list[Order])
def get_user_orders(
    db: Session = Depends(get_db),
    current_user: TokenData = Depends(decode_token)
):
    orders = db.query(bOrder).filter(bOrder.client_id == current_user.user_id).all()
    return orders

@router.delete("/orders/{order_id}/", response_model=dict)
def cancel_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: TokenData = Depends(decode_token)
):
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