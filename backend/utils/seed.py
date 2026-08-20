# from datetime import date, timedelta
# from ..models.models import User, Task, Comment

# def seed(db):
#     if db.query(User).count(): return
#     users=[
#       User(name="Alex Morgan",email="alex@company.local",role="administrator"),
#       User(name="Priya Sharma",email="priya@company.local",role="member"),
#       User(name="Rahul Verma",email="rahul@company.local",role="member"),
#       User(name="Sara Khan",email="sara@company.local",role="member")
#     ]
#     db.add_all(users); db.commit()
#     today=date.today()
#     tasks=[
#       Task(title="Prepare monthly report",description="Compile the team's monthly performance report.",status="in_progress",priority="high",assigned_to=1,due_date=today+timedelta(days=2)),
#       Task(title="Update onboarding checklist",description="Review and update the internal onboarding checklist.",status="pending",priority="medium",assigned_to=1,due_date=today+timedelta(days=5)),
#       Task(title="Fix billing export",description="Investigate the failed billing CSV export.",status="blocked",priority="urgent",assigned_to=2,due_date=today-timedelta(days=1)),
#       Task(title="Design sprint review",description="Prepare agenda and notes for sprint review.",status="completed",priority="low",assigned_to=3,due_date=today-timedelta(days=2)),
#       Task(title="Client access audit",description="Audit internal access for active client projects.",status="pending",priority="high",assigned_to=4,due_date=today+timedelta(days=7))
#     ]
#     db.add_all(tasks); db.commit()
#     db.add(Comment(task_id=1,user_id=1,comment="Started the first draft."))
#     db.commit()
from datetime import date, timedelta

from ..models.models import User, Task, Comment


def seed(db):
    # =========================================================
    # USERS
    # =========================================================

    users_data = [
        {
            "name": "Atul Kumar",
            "email": "atul@company.local",
            "role": "administrator",
        },
        {
            "name": "Priya Sharma",
            "email": "priya@company.local",
            "role": "member",
        },
        {
            "name": "Rahul Verma",
            "email": "rahul@company.local",
            "role": "member",
        },
        {
            "name": "Sara Khan",
            "email": "sara@company.local",
            "role": "member",
        },
        {
            "name": "Aman Gupta",
            "email": "aman@company.local",
            "role": "member",
        },
        {
            "name": "Neha Singh",
            "email": "neha@company.local",
            "role": "member",
        },
        {
            "name": "Rohit Kumar",
            "email": "rohit@company.local",
            "role": "member",
        },
        {
            "name": "Anjali Verma",
            "email": "anjali@company.local",
            "role": "member",
        },
        {
            "name": "Vikash Yadav",
            "email": "vikash@company.local",
            "role": "member",
        },
        {
            "name": "Pooja Sharma",
            "email": "pooja@company.local",
            "role": "member",
        },
    ]

    # ---------------------------------------------------------
    # Update old Alex Morgan account to Atul Kumar
    # ---------------------------------------------------------

    old_user = (
        db.query(User)
        .filter(User.email == "alex@company.local")
        .first()
    )

    if old_user:
        old_user.name = "Atul Kumar"
        old_user.email = "atul@company.local"
        old_user.role = "administrator"
        db.commit()

    # ---------------------------------------------------------
    # Add missing users
    # ---------------------------------------------------------

    existing_emails = {
        user.email for user in db.query(User).all()
    }

    for user_data in users_data:

        # Skip Atul because Alex account was already updated above
        if user_data["email"] == "atul@company.local":
            continue

        if user_data["email"] not in existing_emails:
            new_user = User(
                name=user_data["name"],
                email=user_data["email"],
                role=user_data["role"],
            )

            db.add(new_user)
            db.commit()

            existing_emails.add(user_data["email"])

    # Get all users after inserting
    users = (
        db.query(User)
        .order_by(User.id)
        .all()
    )

    # =========================================================
    # SAMPLE TASKS
    # =========================================================

    # Create sample tasks only if database has no tasks.
    if db.query(Task).count() == 0:

        today = date.today()

        tasks = [
            Task(
                title="Prepare monthly report",
                description=(
                    "Compile the team's monthly performance report."
                ),
                status="in_progress",
                priority="high",
                assigned_to=users[0].id,
                due_date=today + timedelta(days=2),
            ),

            Task(
                title="Update onboarding checklist",
                description=(
                    "Review and update the internal onboarding checklist."
                ),
                status="pending",
                priority="medium",
                assigned_to=users[1].id,
                due_date=today + timedelta(days=5),
            ),

            Task(
                title="Fix billing export",
                description=(
                    "Investigate the failed billing CSV export."
                ),
                status="blocked",
                priority="urgent",
                assigned_to=users[2].id,
                due_date=today - timedelta(days=1),
            ),

            Task(
                title="Design sprint review",
                description=(
                    "Prepare agenda and notes for sprint review."
                ),
                status="completed",
                priority="low",
                assigned_to=users[3].id,
                due_date=today - timedelta(days=2),
            ),

            Task(
                title="Client access audit",
                description=(
                    "Audit internal access for active client projects."
                ),
                status="pending",
                priority="high",
                assigned_to=users[4].id,
                due_date=today + timedelta(days=7),
            ),
        ]

        db.add_all(tasks)
        db.commit()

    # =========================================================
    # SAMPLE COMMENT
    # =========================================================

    if db.query(Comment).count() == 0:

        first_task = (
            db.query(Task)
            .order_by(Task.id)
            .first()
        )

        first_user = (
            db.query(User)
            .order_by(User.id)
            .first()
        )

        if first_task and first_user:

            comment = Comment(
                task_id=first_task.id,
                user_id=first_user.id,
                comment="Started the first draft.",
            )

            db.add(comment)
            db.commit()