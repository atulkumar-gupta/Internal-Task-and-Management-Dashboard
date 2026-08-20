from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.models import User
from ..schemas.schemas import UserCreate, UserOut

router=APIRouter(prefix="/users",tags=["users"])

@router.get("",response_model=list[UserOut])
def get_users(db:Session=Depends(get_db)): return db.query(User).order_by(User.name).all()

@router.post("",response_model=UserOut,status_code=status.HTTP_201_CREATED)
def create_user(payload:UserCreate,db:Session=Depends(get_db)):
    user=User(**payload.model_dump());db.add(user);db.commit();db.refresh(user);return user
