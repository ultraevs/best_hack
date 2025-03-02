from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.db.models.order import Order
from app.db.models.lot import Lot
from app.api.v1.schemas.user import TokenData
from app.api.v1.schemas.order import OrderCreate, Order
from app.db.models.order import Order as bOrder
from app.db.models.lot import Lot
from datetime import date
import logging

logger = logging.getLogger(__name__)

def create_order(
    db: Session,
    order: OrderCreate,
    current_user: TokenData
):
    try:
        lot = db.query(Lot).filter(Lot.id == order.lot_id).first()
        if not lot:
            logger.error(f"Lot not found - Lot ID: {order.lot_id}")
            raise HTTPException(status_code=404, detail="Lot not found")
        
        if order.volume > lot.available_volume:
            logger.error(
                f"Not enough fuel available - Lot ID: {lot.id}, Available: {lot.available_volume}, Requested: {order.volume}"
            )
            raise HTTPException(
                status_code=400,
                detail=f"Not enough fuel available. Available: {lot.available_volume}, requested: {order.volume}"
            )
        
        lot.available_volume -= order.volume
        lot.lot_price = lot.price_per_ton * lot.available_volume
        
        if lot.available_volume == 0:
            lot.status = "Продан"
            logger.info(f"Lot status updated to 'Продан' - Lot ID: {lot.id}")
        
        db_order = bOrder(
            order_date=date.today(),  
            client_id=current_user.user_id, 
            **order.dict(exclude={"client_id"})  
        )
        db.add(db_order)
        db.commit()
        db.refresh(db_order)
        
        logger.info(
            f"Order created successfully - Order ID: {db_order.id}, Lot ID: {db_order.lot_id}, "
            f"Client ID: {db_order.client_id}, Volume: {db_order.volume}"
        )
        return db_order
    except Exception as e:
        logger.error(f"Error creating order: {str(e)}", exc_info=True)
        db.rollback()
        raise

def delete_order(order_id: int, db: Session, current_user: TokenData):
    try:
        order = db.query(bOrder).filter(bOrder.id == order_id).first()
        if not order:
            logger.error(f"Order not found - Order ID: {order_id}")
            raise HTTPException(status_code=404, detail="Order not found")
        
        if order.client_id != current_user.user_id:
            logger.error(
                f"Unauthorized order cancellation attempt - Order ID: {order.id}, "
                f"Client ID: {order.client_id}, Current User ID: {current_user.user_id}"
            )
            raise HTTPException(status_code=403, detail="You can only cancel your own orders")
        
        lot = db.query(Lot).filter(Lot.id == order.lot_id).first()
        if not lot:
            logger.error(f"Lot not found - Lot ID: {order.lot_id}")
            raise HTTPException(status_code=404, detail="Lot not found")
        
        lot.available_volume += order.volume
        
        lot.lot_price = lot.available_volume * lot.price_per_ton
        
        if lot.available_volume > 0 and lot.status == "Продан":
            lot.status = "Подтвержден"
        
        # Удаляем заказ
        db.delete(order)
        db.commit()
        
        logger.info(f"Order cancelled successfully - Order ID: {order_id}, Lot ID: {lot.id}")
        return {"message": "Order cancelled successfully"}
    except Exception as e:
        logger.error(f"Error cancelling order: {str(e)}", exc_info=True)
        db.rollback()
        raise