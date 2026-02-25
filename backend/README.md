# Founder Matrimony Backend

Premium FastAPI backend for cofounder matching.

## Architecture
- **Framework**: FastAPI (Asynchronous support)
- **Database**: MySQL with SQLAlchemy ORM
- **Migration**: Alembic
- **Auth**: JWT with OAuth2 + Password Hashing (bcrypt)
- **Validation**: Pydantic v2
- **Config**: TOML based modular settings

## Project Structure
```text
backend/
├── app/
│   ├── api/          # Route handlers
│   ├── core/         # Config, Security, Auth
│   ├── db/           # Session & Connection
│   ├── models/       # SQLAlchemy Domain Models
│   ├── schemas/      # Pydantic Request/Response Models
│   └── services/     # Business logic layer
├── alembic/          # Database migrations
├── config.toml       # Application configuration
└── main.py          # FastAPI Entry Point
```

## Setup & Running

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure MySQL**:
   Update `backend/config.toml` with your MySQL credentials.

3. **Run Migrations** (After setting up Alembic):
   ```bash
   alembic upgrade head
   ```

4. **Start Development Server**:
   ```bash
   uvicorn app.main:app --reload
   ```

## API Documentation
Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- Redoc: `http://localhost:8000/redoc`
