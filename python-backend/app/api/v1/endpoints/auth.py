from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.api.v1.schemas.user import UserCreate, Token, LoginRequest
from app.api.v1.schemas.user import Token
from app.services.auth import register_service, login_service
router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/register/", response_model=Token)
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_service(user, db)


@router.post("/token/", response_model=Token)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    return login_service(data, db)