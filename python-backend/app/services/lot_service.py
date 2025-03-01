from typing import Dict, List, Optional
from sqlalchemy.orm import Session
from app.db.models.lot import Lot
from app.api.v1.schemas.lot import LotCreate

def create_lot(db: Session, lot: LotCreate):
    db_lot = Lot(**lot.dict())
    db.add(db_lot)
    db.commit()
    db.refresh(db_lot)
    return db_lot

def get_lots(
    db: Session,
    filters: Dict[str, List[str]]
):
    query = db.query(Lot)

    for field, values in filters.items():
        if values:
            query = query.filter(getattr(Lot, field).in_(values))

    return query.all()

def get_lot(db: Session, lot_id: int):
    return db.query(Lot).filter(Lot.id == lot_id).first()
