"""
API routes package.

All FastAPI route modules are kept separate
to maintain a clean and reusable architecture.
"""

from . import tasks
from . import users
from . import dashboard
from . import external

__all__ = [
    "tasks",
    "users",
    "dashboard",
    "external",
]