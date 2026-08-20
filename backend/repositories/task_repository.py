# # from sqlalchemy import or_, asc, desc
# # from ..models.models import Task

# # def list_tasks(db, status=None, priority=None, assignee=None, search=None, page=1, limit=10, sort="due_date"):
# #     q = db.query(Task)
# #     if status: q=q.filter(Task.status==status)
# #     if priority: q=q.filter(Task.priority==priority)
# #     if assignee: q=q.filter(Task.assigned_to==assignee)
# #     if search:
# #         term=f"%{search}%"
# #         q=q.filter(or_(Task.title.ilike(term), Task.description.ilike(term)))
# #     column=getattr(Task, sort if sort in {"due_date","created_at","updated_at","title"} else "due_date")
# #     q=q.order_by(asc(column))
# #     total=q.count()
# #     return q.offset((page-1)*limit).limit(limit).all(), total
# from sqlalchemy import or_, asc, desc
# from sqlalchemy.orm import Session

# from ..models.models import Task


# def list_tasks(
#     db: Session,
#     status=None,
#     priority=None,
#     assignee=None,
#     search=None,
#     page=1,
#     limit=10,
#     sort="due_date",
#     order="asc",
# ):
#     """
#     Fetch tasks with:
#     - Search
#     - Status filter
#     - Priority filter
#     - Assignee filter
#     - Pagination
#     - Sorting
#     """

#     # Base query
#     query = db.query(Task)

#     # -----------------------------
#     # STATUS FILTER
#     # -----------------------------
#     if status:
#         query = query.filter(Task.status == status)

#     # -----------------------------
#     # PRIORITY FILTER
#     # -----------------------------
#     if priority:
#         query = query.filter(Task.priority == priority)

#     # -----------------------------
#     # ASSIGNEE FILTER
#     # -----------------------------
#     if assignee:
#         query = query.filter(Task.assigned_to == assignee)

#     # -----------------------------
#     # SEARCH
#     # -----------------------------
#     if search:
#         search = search.strip()

#         if search:
#             term = f"%{search}%"

#             query = query.filter(
#                 or_(
#                     Task.title.ilike(term),
#                     Task.description.ilike(term),
#                 )
#             )

#     # -----------------------------
#     # SORTING
#     # -----------------------------
#     allowed_sort_fields = {
#         "due_date": Task.due_date,
#         "created_at": Task.created_at,
#         "updated_at": Task.updated_at,
#         "title": Task.title,
#         "priority": Task.priority,
#         "status": Task.status,
#     }

#     sort_column = allowed_sort_fields.get(
#         sort,
#         Task.due_date
#     )

#     if order.lower() == "desc":
#         query = query.order_by(desc(sort_column))
#     else:
#         query = query.order_by(asc(sort_column))

#     # -----------------------------
#     # TOTAL RECORDS
#     # -----------------------------
#     total = query.count()

#     # -----------------------------
#     # PAGINATION SAFETY
#     # -----------------------------
#     if page < 1:
#         page = 1

#     if limit < 1:
#         limit = 10

#     if limit > 100:
#         limit = 100

#     offset = (page - 1) * limit

#     # -----------------------------
#     # PAGINATED DATA
#     # -----------------------------
#     items = (
#         query
#         .offset(offset)
#         .limit(limit)
#         .all()
#     )

#     return items, total
from sqlalchemy import or_, asc, desc
from sqlalchemy.orm import Session

from ..models.models import Task


def list_tasks(
    db: Session,
    status=None,
    priority=None,
    assignee=None,
    search=None,
    page=1,
    limit=10,
    sort="due_date",
    order="asc",
):
    # Safety
    page = max(1, page)
    limit = max(1, min(limit, 100))

    # Base query
    query = db.query(Task)

    # Status filter
    if status:
        query = query.filter(Task.status == status)

    # Priority filter
    if priority:
        query = query.filter(Task.priority == priority)

    # Assignee filter
    if assignee:
        query = query.filter(Task.assigned_to == assignee)

    # Search filter
    if search:
        search = search.strip()

        if search:
            term = f"%{search}%"

            query = query.filter(
                or_(
                    Task.title.ilike(term),
                    Task.description.ilike(term),
                )
            )

    # Allowed sorting
    allowed_sort_fields = {
        "due_date": Task.due_date,
        "created_at": Task.created_at,
        "updated_at": Task.updated_at,
        "title": Task.title,
        "priority": Task.priority,
        "status": Task.status,
    }

    sort_column = allowed_sort_fields.get(
        sort,
        Task.due_date
    )

    # Sorting
    if order and order.lower() == "desc":
        query = query.order_by(desc(sort_column))
    else:
        query = query.order_by(asc(sort_column))

    # Total BEFORE pagination
    total = query.count()

    # Pagination
    offset = (page - 1) * limit

    items = (
        query
        .offset(offset)
        .limit(limit)
        .all()
    )

    return items, total