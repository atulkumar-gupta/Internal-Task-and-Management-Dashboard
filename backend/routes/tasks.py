# from math import ceil
# from fastapi import APIRouter, Depends, HTTPException, Query, status
# from sqlalchemy.orm import Session
# from ..database import get_db
# from ..models.models import Task, Comment
# from ..schemas.schemas import TaskCreate, TaskUpdate, CommentCreate
# from ..repositories.task_repository import list_tasks
# from ..services.task_service import create_task, update_task, add_comment

# router=APIRouter(prefix="/tasks",tags=["tasks"])

# def serialize(t,db):
#     return {
#       "id":t.id,"title":t.title,"description":t.description or "","status":t.status,"priority":t.priority,
#       "assigned_to":t.assigned_to,"assignee_name":t.assignee.name,"due_date":t.due_date,
#       "created_at":t.created_at,"updated_at":t.updated_at,
#       "comments":[{"id":c.id,"comment":c.comment,"user_id":c.user_id,"user_name":c.user.name,"created_at":c.created_at} for c in t.comments]
#     }

# @router.get("")
# def get_tasks(status:str|None=None,priority:str|None=None,assignee:int|None=None,search:str|None=None,page:int=Query(1,ge=1),limit:int=Query(10,ge=1,le=100),sort:str="due_date",db:Session=Depends(get_db)):
#     items,total=list_tasks(db,status,priority,assignee,search,page,limit,sort)
#     return {"items":[serialize(t,db) for t in items],"total":total,"page":page,"limit":limit,"pages":max(1,ceil(total/limit))}

# @router.get("/{task_id}")
# def get_task(task_id:int,db:Session=Depends(get_db)):
#     t=db.query(Task).filter(Task.id==task_id).first()
#     if not t: raise HTTPException(404,"Task not found")
#     return serialize(t,db)

# @router.post("",status_code=status.HTTP_201_CREATED)
# def post_task(payload:TaskCreate,db:Session=Depends(get_db)): return serialize(create_task(db,payload),db)

# @router.put("/{task_id}")
# def put_task(task_id:int,payload:TaskUpdate,db:Session=Depends(get_db)):
#     t=db.query(Task).filter(Task.id==task_id).first()
#     if not t: raise HTTPException(404,"Task not found")
#     return serialize(update_task(db,t,payload),db)

# @router.delete("/{task_id}",status_code=status.HTTP_204_NO_CONTENT)
# def delete_task(task_id:int,db:Session=Depends(get_db)):
#     t=db.query(Task).filter(Task.id==task_id).first()
#     if not t: raise HTTPException(404,"Task not found")
#     db.delete(t);db.commit()

# @router.post("/{task_id}/comments",status_code=status.HTTP_201_CREATED)
# def post_comment(task_id:int,payload:CommentCreate,db:Session=Depends(get_db)):
#     c=add_comment(db,task_id,payload)
#     return {"id":c.id,"task_id":c.task_id,"user_id":c.user_id,"comment":c.comment,"created_at":c.created_at}
from math import ceil

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models.models import Task
from ..schemas.schemas import (
    TaskCreate,
    TaskUpdate,
    CommentCreate,
)
from ..repositories.task_repository import list_tasks
from ..services.task_service import (
    create_task,
    update_task,
    add_comment,
)

router = APIRouter(
    prefix="/tasks",
    tags=["tasks"],
)


# ---------------------------------------------------------
# SERIALIZE TASK
# ---------------------------------------------------------

def serialize_task(task):
    comments = []

    for comment in task.comments:
        comments.append({
            "id": comment.id,
            "comment": comment.comment,
            "user_id": comment.user_id,
            "user_name": (
                comment.user.name
                if comment.user
                else "Unknown"
            ),
            "created_at": comment.created_at,
        })

    return {
        "id": task.id,
        "title": task.title,
        "description": task.description or "",
        "status": task.status,
        "priority": task.priority,
        "assigned_to": task.assigned_to,
        "assignee_name": (
            task.assignee.name
            if task.assignee
            else "Unassigned"
        ),
        "due_date": task.due_date,
        "created_at": task.created_at,
        "updated_at": task.updated_at,
        "comments": comments,
    }


# ---------------------------------------------------------
# GET TASKS
# ---------------------------------------------------------

@router.get("")
def get_tasks(
    status: str | None = Query(default=None),
    priority: str | None = Query(default=None),
    assignee: int | None = Query(default=None, ge=1),
    search: str | None = Query(default=None),

    page: int = Query(
        default=1,
        ge=1,
    ),

    limit: int = Query(
        default=5,
        ge=1,
        le=100,
    ),

    sort: str = Query(
        default="due_date",
    ),

    order: str = Query(
        default="asc",
    ),

    db: Session = Depends(get_db),
):
    items, total = list_tasks(
        db=db,
        status=status,
        priority=priority,
        assignee=assignee,
        search=search,
        page=page,
        limit=limit,
        sort=sort,
        order=order,
    )

    pages = max(
        1,
        ceil(total / limit),
    )

    return {
        "items": [
            serialize_task(task)
            for task in items
        ],
        "total": total,
        "page": page,
        "limit": limit,
        "pages": pages,
        "has_previous": page > 1,
        "has_next": page < pages,
    }


# ---------------------------------------------------------
# GET SINGLE TASK
# ---------------------------------------------------------

@router.get("/{task_id}")
def get_task(
    task_id: int,
    db: Session = Depends(get_db),
):
    task = (
        db.query(Task)
        .filter(Task.id == task_id)
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    return serialize_task(task)


# ---------------------------------------------------------
# CREATE TASK
# ---------------------------------------------------------

@router.post(
    "",
    status_code=status.HTTP_201_CREATED,
)
def post_task(
    payload: TaskCreate,
    db: Session = Depends(get_db),
):
    task = create_task(
        db,
        payload,
    )

    return serialize_task(task)


# ---------------------------------------------------------
# UPDATE TASK
# ---------------------------------------------------------

@router.put("/{task_id}")
def put_task(
    task_id: int,
    payload: TaskUpdate,
    db: Session = Depends(get_db),
):
    task = (
        db.query(Task)
        .filter(Task.id == task_id)
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    updated_task = update_task(
        db,
        task,
        payload,
    )

    return serialize_task(updated_task)


# ---------------------------------------------------------
# DELETE TASK
# ---------------------------------------------------------

@router.delete(
    "/{task_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
):
    task = (
        db.query(Task)
        .filter(Task.id == task_id)
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    db.delete(task)
    db.commit()

    return None


# ---------------------------------------------------------
# ADD COMMENT
# ---------------------------------------------------------

@router.post(
    "/{task_id}/comments",
    status_code=status.HTTP_201_CREATED,
)
def post_comment(
    task_id: int,
    payload: CommentCreate,
    db: Session = Depends(get_db),
):
    task = (
        db.query(Task)
        .filter(Task.id == task_id)
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    comment = add_comment(
        db,
        task_id,
        payload,
    )

    return {
        "id": comment.id,
        "task_id": comment.task_id,
        "user_id": comment.user_id,
        "comment": comment.comment,
        "created_at": comment.created_at,
    }