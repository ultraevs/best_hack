from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.lot_service import get_lots, get_lot
from app.api.v1.schemas.lot import Lot

router = APIRouter()

@router.get("/lots/", response_model=list[Lot])
def read_lots(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    lots = get_lots(db, skip=skip, limit=limit)
    return lots

@router.get("/lots/{lot_id}", response_model=Lot)
def read_lot(lot_id: int, db: Session = Depends(get_db)):
    lot = get_lot(db, lot_id=lot_id)
    if lot is None:
        raise HTTPException(status_code=404, detail="Lot not found")
    return lot