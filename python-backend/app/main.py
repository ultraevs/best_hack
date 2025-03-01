from fastapi import FastAPI
from app.api.v1.endpoints import lots, orders
from app.db.session import engine
from app.db.models.base import Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(lots.router, prefix="/api/v1")
app.include_router(orders.router, prefix="/api/v1")