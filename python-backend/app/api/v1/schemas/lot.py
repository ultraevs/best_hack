from pydantic import BaseModel
from datetime import date

class LotBase(BaseModel):
    date: date
    fuel_type: str
    nb_name: str
    nb_region: str
    start_weight: float
    available_volume: float
    status: str
    lot_price: float
    price_per_ton: float

class LotCreate(LotBase):
    pass

class Lot(LotBase):
    id: int

    class Config:
        orm_mode = True