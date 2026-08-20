from datetime import datetime
from fastapi import HTTPException
from ..models.models import Task, User, Comment

def validate_user(db, user_id):
    user=db.query(User).filter(User.id==user_id).first()
    if not user: raise HTTPException(404, "Assigned user not found")
    return user

def create_task(db, payload):
    validate_user(db,payload.assigned_to)
    task=Task(**payload.model_dump())
    db.add(task); db.commit(); db.refresh(task)
    return task

def update_task(db, task, payload):
    values=payload.model_dump(exclude_unset=True)
    if "assigned_to" in values: validate_user(db, values["assigned_to"])
    for k,v in values.items(): setattr(task,k,v)
    task.updated_at=datetime.utcnow()
    db.commit(); db.refresh(task)
    return task

def add_comment(db, task_id, payload):
    if not db.query(Task).filter(Task.id==task_id).first(): raise HTTPException(404,"Task not found")
    if not db.query(User).filter(User.id==payload.user_id).first(): raise HTTPException(404,"User not found")
    c=Comment(task_id=task_id, **payload.model_dump())
    db.add(c); db.commit(); db.refresh(c); return c
