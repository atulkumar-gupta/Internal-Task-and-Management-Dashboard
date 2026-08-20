<!-- # Internal Task & Management Dashboard

A small internal task-tracking application built for the assignment.

## Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Python + FastAPI
- Database: SQLite (assignment-acceptable alternative to PostgreSQL)
- External API: JSONPlaceholder

## Project structure
- `frontend/src/components` reusable UI components
- `frontend/src/pages` application pages
- `frontend/src/services` API integration
- `frontend/src/hooks` reusable React hooks
- `backend/routes` REST endpoints
- `backend/services` business logic
- `backend/models` SQLAlchemy database models
- `backend/schemas` request validation
- `backend/repositories` database query logic
- `backend/utils` seed and utilities

## Run backend

Windows PowerShell:
```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

If PowerShell blocks activation, run:
```powershell
Set-ExecutionPolicy -Scope Process Bypass
.venv\Scripts\Activate.ps1
```

## Run frontend

Open a second terminal:
```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally:
`http://localhost:5173`

## API
- GET `/api/tasks`
- GET `/api/tasks/{id}`
- POST `/api/tasks`
- PUT `/api/tasks/{id}`
- DELETE `/api/tasks/{id}`
- GET `/api/tasks/{id}` plus `/comments`
- GET `/api/users`
- POST `/api/users`
- GET `/api/dashboard`
- GET `/api/external/users`
- GET `/api/health`

The backend seeds sample users/tasks on first startup.
## Project Structure

```text
Internal_Task_Manage-dashboard/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── utils/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── repositories/
│   ├── models/
│   ├── schemas/
│   ├── database.py
│   ├── main.py
│   └── requirements.txt
│
├── screenshots/
│   ├── dashboard.png
│   ├── tasks.png
│   ├── task-details.png
│   ├── team.png
│   ├── Create task.png
│   ├── Create task1.png
│   ├── Createtask task name.png
│   ├── Createtask1.png
│   ├── Createtaskpriority.png
│   ├── Dashboard.png
│   ├── Edit task.png
│   ├── Task Management.png
│   ├── Task.png
│   ├── Task1.png
│   ├── Taskflow.png
│   ├── taskflow1.png
│   ├── tasks2.png
│   ├── Tasksstats.png
│   ├── tasksstats1.png
│   ├── Tasksstats3.png
│   ├── Team.png
│   └── Teams.png
│
├── .gitignore
└── README.md

## Screenshots

### Dashboard

![Dashboard](./screenshots/dashboard.png)

### Task Management

![Task Management](./screenshots/task-management.png)

### Tasks

![Task](./screenshots/task.png)

![Task 1](./screenshots/task-1.png)

![Tasks 2](./screenshots/tasks-2.png)

### Create Task

![Create Task](./screenshots/create-task.png)

![Create Task 1](./screenshots/create-task-1.png)

![Create Task Name](./screenshots/create-task-name.png)

![Create Task 2](./screenshots/create-task-2.png)

![Create Task Priority](./screenshots/create-task-priority.png)

### Edit Task

![Edit Task](./screenshots/edit-task.png)

### Task Flow

![Task Flow](./screenshots/task-flow.png)

![Task Flow 1](./screenshots/task-flow-1.png)

### Task Statistics

![Task Statistics](./screenshots/task-stats.png)

![Task Statistics 1](./screenshots/task-stats-1.png)

![Task Statistics 3](./screenshots/task-stats-3.png)

### Team

![Team](./screenshots/team.png)

![Teams](./screenshots/teams.png) -->
# Internal Task & Management Dashboard

A small internal task-tracking application built for the assignment.

## Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Python + FastAPI
- Database: SQLite (assignment-acceptable alternative to PostgreSQL)
- External API: JSONPlaceholder

## Project Structure

```text
Internal_Task_Manage-dashboard/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── utils/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── repositories/
│   ├── models/
│   ├── schemas/
│   ├── database.py
│   ├── main.py
│   └── requirements.txt
│
├── screenshots/
│   ├── Create task.png
│   ├── Create task1.png
│   ├── Createtask task name.png
│   ├── Createtask1.png
│   ├── Createtaskpriority.png
│   ├── Dashboard.png
│   ├── Edit task.png
│   ├── Task Management.png
│   ├── Task.png
│   ├── Task1.png
│   ├── Taskflow.png
│   ├── taskflow1.png
│   ├── tasks2.png
│   ├── Tasksstats.png
│   ├── tasksstats1.png
│   ├── Tasksstats3.png
│   ├── Team.png
│   └── Teams.png
│
├── .gitignore
└── README.md
```

## Run Backend

Windows PowerShell:

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

If PowerShell blocks activation:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.venv\Scripts\Activate.ps1
```

## Run Frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## API

- GET `/api/tasks`
- GET `/api/tasks/{id}`
- POST `/api/tasks`
- PUT `/api/tasks/{id}`
- DELETE `/api/tasks/{id}`
- GET `/api/users`
- POST `/api/users`
- GET `/api/dashboard`
- GET `/api/external/users`
- GET `/api/health`

The backend seeds sample users and tasks on first startup.

## Screenshots

### Dashboard

![Dashboard](./screenshots/Dashboard.png)

### Task Management

![Task Management](./screenshots/Task%20Management.png)

### Tasks

![Task](./screenshots/Task.png)

![Task 1](./screenshots/Task1.png)

![Tasks 2](./screenshots/tasks2.png)

### Create Task

![Create Task](./screenshots/Create%20task.png)

![Create Task 1](./screenshots/Create%20task1.png)

![Create Task Name](./screenshots/Createtask%20task%20name.png)

![Create Task 2](./screenshots/Createtask1.png)

![Create Task Priority](./screenshots/Createtaskpriority.png)

### Edit Task

![Edit Task](./screenshots/Edit%20task.png)

### Task Flow

![Task Flow](./screenshots/Taskflow.png)

![Task Flow 1](./screenshots/taskflow1.png)

### Task Statistics

![Task Statistics](./screenshots/Tasksstats.png)

![Task Statistics 1](./screenshots/tasksstats1.png)

![Task Statistics 3](./screenshots/Tasksstats3.png)

### Team

![Team](./screenshots/Team.png)

![Teams](./screenshots/Teams.png)