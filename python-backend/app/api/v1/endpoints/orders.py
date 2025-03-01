from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.order_service import create_order
from app.api.v1.schemas.order import OrderCreate, Order

router = APIRouter()

@router.post("/orders/", response_model=Order)
def create_new_order(order: OrderCreate, db: Session = Depends(get_db)):
    return create_order(db=db, order=order)