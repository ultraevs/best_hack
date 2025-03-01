from sqlalchemy.orm import Session
from app.db.models.lot import Lot
from app.api.v1.schemas.lot import LotCreate

def create_lot(db: Session, lot: LotCreate):
    db_lot = Lot(**lot.dict())
    db.add(db_lot)
    db.commit()
    db.refresh(db_lot)
    return db_lot

def get_lots(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Lot).offset(skip).limit(limit).all()

def get_lot(db: Session, lot_id: int):
    return db.query(Lot).filter(Lot.id == lot_id).first()