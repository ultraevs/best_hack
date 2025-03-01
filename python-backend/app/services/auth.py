from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.db.models.user import User
from app.api.v1.schemas.user import UserCreate, Token, LoginRequest
from app.core.security import get_password_hash, create_access_token, verify_password
from datetime import timedelta
from app.api.v1.schemas.user import Token
import logging

logger = logging.getLogger(__name__)

def register_service(user: UserCreate, db: Session) -> Token:
    db_user_email = db.query(User).filter(User.email == user.email).first()
    db_user_username = db.query(User).filter(User.username == user.username).first()
    if db_user_email or db_user_username:
        logger.error(f"Registration failed: Email or username already registered - Email: {user.email}, Username: {user.username}")
        raise HTTPException(status_code=400, detail="Email or username already registered")
    
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    access_token = create_access_token(
        data={"sub": db_user.username, "id":db_user.id, "email":db_user.email}, expires_delta=timedelta(days=365)
    )
    logger.info(f"User registered successfully - Username: {db_user.username}, Email: {db_user.email}")
    return Token(access_token=access_token, token_type="bearer")


def login_service(data: LoginRequest, db: Session) -> Token:
    user = db.query(User).filter(User.username == data.username).first()
    if not user or not verify_password(data.password, user.hashed_password):
        logger.error(f"Login failed: Incorrect username or password - Username: {data.username}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(
        data={"sub": user.username, "id":user.id, "email":user.email}, expires_delta=timedelta(days=365)
    )
    logger.info(f"User logged in successfully - Username: {user.username}, Email: {user.email}")
    return Token(access_token=access_token, token_type="bearer")