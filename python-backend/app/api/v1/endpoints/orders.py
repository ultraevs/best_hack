from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.order_service import create_order, delete_order
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
    return delete_order(order_id, db, current_user)