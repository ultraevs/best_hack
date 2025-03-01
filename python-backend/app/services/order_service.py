from sqlalchemy.orm import Session
from app.db.models.order import Order
from app.api.v1.schemas.order import OrderCreate

def create_order(db: Session, order: OrderCreate):
    db_order = Order(**order.dict())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order