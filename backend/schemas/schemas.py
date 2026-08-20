from datetime import date, datetime
from typing import Optional, Literal
from pydantic import BaseModel, ConfigDict, Field

Status = Literal["pending","in_progress","completed","blocked"]
Priority = Literal["low","medium","high","urgent"]

class UserCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: str = Field(min_length=5, max_length=200)
    role: str = "member"

class UserOut(UserCreate):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class TaskCreate(BaseModel):
    title: str = Field(min_length=2, max_length=200)
    description: str = ""
    status: Status = "pending"
    priority: Priority = "medium"
    assigned_to: int
    due_date: date

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(default=None, min_length=2, max_length=200)
    description: Optional[str] = None
    status: Optional[Status] = None
    priority: Optional[Priority] = None
    assigned_to: Optional[int] = None
    due_date: Optional[date] = None

class CommentCreate(BaseModel):
    user_id: int
    comment: str = Field(min_length=1, max_length=2000)

class CommentOut(CommentCreate):
    id: int
    created_at: datetime
    user_name: str = ""
    model_config = ConfigDict(from_attributes=True)

class TaskOut(TaskCreate):
    id: int
    created_at: datetime
    updated_at: datetime
    assignee_name: str = ""
    comments: list[dict] = []
    model_config = ConfigDict(from_attributes=True)
