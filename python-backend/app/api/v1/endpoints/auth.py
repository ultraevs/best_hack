from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models.user import User
from app.api.v1.schemas.user import UserCreate, Token, LoginRequest
from app.core.security import get_password_hash, create_access_token, verify_password
from datetime import timedelta
from app.api.v1.schemas.user import Token

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/register/", response_model=Token)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user_email = db.query(User).filter(User.email == user.email).first()
    db_user_username = db.query(User).filter(User.username == user.username).first()
    if db_user_email or db_user_username:
        raise HTTPException(status_code=400, detail="Email or username already registered")
    
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    access_token = create_access_token(
        data={"sub": db_user.username, "id":db_user.id, "email":db_user.email}, expires_delta=timedelta(days=365)
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/token/", response_model=Token)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == data.username).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(
        data={"sub": user.username, "id":user.id, "email":user.email}, expires_delta=timedelta(days=365)
    )
    return {"access_token": access_token, "token_type": "bearer"}