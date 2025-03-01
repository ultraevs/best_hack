from sqlalchemy import Column, Integer, String, Float, Date
from app.db.models.base import Base

class Lot(Base):
    __tablename__ = 'lots'
    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(Date, nullable=False)
    ksss_nb_code = Column(Integer, nullable=False)
    ksss_fuel_code = Column(Integer, nullable=False)
    start_weight = Column(Float, nullable=False)
    available_volume = Column(Float, nullable=False)
    status = Column(String, default="Подтвержден")
    lot_price = Column(Float, nullable=False)
    price_per_ton = Column(Float, nullable=False)