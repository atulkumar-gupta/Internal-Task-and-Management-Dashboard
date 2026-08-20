from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine, SessionLocal
from .models.models import User, Task, Comment
from .routes import tasks, users, dashboard, external
from .utils.seed import seed

Base.metadata.create_all(bind=engine)
db=SessionLocal()
try: seed(db)
finally: db.close()

app=FastAPI(title="Internal Task & Management Dashboard API",version="1.0.0")
app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:5173","http://127.0.0.1:5173"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])
app.include_router(tasks.router,prefix="/api")
app.include_router(users.router,prefix="/api")
app.include_router(dashboard.router,prefix="/api")
app.include_router(external.router,prefix="/api")

@app.get("/api/health")
def health(): return {"status":"ok"}
