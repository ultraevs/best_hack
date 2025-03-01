from pydantic import BaseModel
from datetime import date

class OrderBase(BaseModel):
    order_date: date
    lot_id: int
    ksss_nb_code: int
    ksss_fuel_code: int
    volume: float
    delivery_type: str
    client_id: int

class OrderCreate(OrderBase):
    pass

class Order(OrderBase):
    id: int

    class Config:
        orm_mode = True