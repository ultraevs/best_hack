from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from typing import List, Dict
from app.services.filters import lot_filters_service
router = APIRouter(tags=["Filter"])

@router.get("/lot-filters/", response_model=Dict[str, List[str]])
def get_lot_filters(db: Session = Depends(get_db)):
    return lot_filters_service(db)