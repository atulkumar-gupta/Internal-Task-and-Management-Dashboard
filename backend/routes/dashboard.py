from datetime import date
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.models import Task

router=APIRouter(prefix="/dashboard",tags=["dashboard"])

@router.get("")
def dashboard(db:Session=Depends(get_db)):
    total=db.query(Task).count()
    pending=db.query(Task).filter(Task.status=="pending").count()
    progress=db.query(Task).filter(Task.status=="in_progress").count()
    completed=db.query(Task).filter(Task.status=="completed").count()
    overdue=db.query(Task).filter(Task.due_date<date.today(),Task.status!="completed").count()
    mine=db.query(Task).filter(Task.assigned_to==1).order_by(Task.due_date).limit(6).all()
    return {"total_tasks":total,"pending_tasks":pending,"in_progress_tasks":progress,"completed_tasks":completed,"overdue_tasks":overdue,"current_user_tasks":db.query(Task).filter(Task.assigned_to==1).count(),"my_tasks":[{"id":t.id,"title":t.title,"status":t.status,"priority":t.priority,"due_date":t.due_date} for t in mine]}
