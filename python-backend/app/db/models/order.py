from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from app.db.models.base import Base

class Order(Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True, autoincrement=True)
    order_date = Column(Date, nullable=False)
    lot_id = Column(Integer, ForeignKey('lots.id'), nullable=False)
    ksss_nb_code = Column(Integer, nullable=False)
    ksss_fuel_code = Column(Integer, nullable=False)
    volume = Column(Float, nullable=False)
    delivery_type = Column(String, nullable=False)
    client_id = Column(Integer, nullable=False)