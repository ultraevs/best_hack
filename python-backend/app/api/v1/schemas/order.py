from pydantic import BaseModel
from datetime import date

class OrderBase(BaseModel):
    order_date: date
    lot_id: int
    nb_name: str
    nb_region: str
    fuel_type: str
    volume: float
    delivery_type: str
    delivery_address: str
    client_id: int

class OrderCreate(BaseModel):
    lot_id: int
    nb_name: str
    nb_region: str
    fuel_type: str
    volume: float
    delivery_type: str
    delivery_address: str | None = None


class Order(OrderBase):
    id: int

    class Config:
        orm_mode = True