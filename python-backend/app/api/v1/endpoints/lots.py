from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.lot_service import get_lots, get_lot
from app.api.v1.schemas.lot import Lot

router = APIRouter()

@router.get("/lots/", response_model=list[Lot])
def get_filtered_lots(
    fuel_type: List[str] = Query(None),
    nb_name: List[str] = Query(None),  
    nb_region: List[str] = Query(None),  
    db: Session = Depends(get_db)
):
    filters = {
        "fuel_type": fuel_type,
        "nb_name": nb_name,
        "nb_region": nb_region,
    }

    filters = {k: v for k, v in filters.items() if v}

    lots = get_lots(db, filters=filters)
    return lots

@router.get("/lots/{lot_id}", response_model=Lot)
def read_lot(lot_id: int, db: Session = Depends(get_db)):
    lot = get_lot(db, lot_id=lot_id)
    if lot is None:
        raise HTTPException(status_code=404, detail="Lot not found")
    return lot