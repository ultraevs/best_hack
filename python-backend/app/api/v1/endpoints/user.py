from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.security import decode_token
from app.api.v1.schemas.user import TokenData

router = APIRouter()

@router.get("/user/me/", response_model=dict)
def get_current_user_info(
    current_user: TokenData = Depends(decode_token),
    db: Session = Depends(get_db)
):
    user_info = {
        "username": current_user.username,
        "id": current_user.user_id,
        "email": current_user.email
    }
    return user_info