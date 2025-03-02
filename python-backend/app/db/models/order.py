from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from app.db.models.base import Base

class Order(Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True, autoincrement=True)
    order_date = Column(Date, nullable=False)
    lot_id = Column(Integer, ForeignKey('lots.id'), nullable=False)
    nb_name = Column(String, nullable=False)
    nb_region = Column(String, nullable=False)
    fuel_type = Column(String, nullable=False)
    volume = Column(Float, nullable=False)
    delivery_type = Column(String, nullable=False)
    delivery_address = Column(String, nullable=True)
    client_id = Column(Integer, nullable=False)