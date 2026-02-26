from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime
from uuid import UUID
from app.models.models import UserRole, StartupStage

# Auth Schemas
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: UUID
    is_active: bool
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[UUID] = None

# Profile Schemas
class ProfileBase(BaseModel):
    name: str
    role: UserRole
    location: Optional[str] = None
    bio: Optional[str] = None
    years_of_experience: int = 0
    education: Optional[str] = None
    startup_vision: Optional[str] = None
    commitment: Optional[str] = "Full-time"
    skills: List[str] = []
    industries: List[str] = []
    looking_for: List[UserRole] = []
    photo_url: Optional[str] = None
    is_visible: bool = True
    startup_stage: StartupStage = StartupStage.IDEA

class ProfileCreate(ProfileBase):
    pass

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[UserRole] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    years_of_experience: Optional[int] = None
    education: Optional[str] = None
    startup_vision: Optional[str] = None
    commitment: Optional[str] = None
    skills: Optional[List[str]] = None
    industries: Optional[List[str]] = None
    looking_for: Optional[List[UserRole]] = None
    photo_url: Optional[str] = None
    is_visible: Optional[bool] = None
    startup_stage: Optional[StartupStage] = None

class ProfileResponse(ProfileBase):
    id: UUID
    user_id: UUID
    last_active: Optional[datetime] = None
    class Config:
        from_attributes = True

# Interaction Schemas
class SwipeCreate(BaseModel):
    swiped_id: UUID
    direction: str # 'left' or 'right'

class MatchResponse(BaseModel):
    id: UUID
    user_1_id: UUID
    user_2_id: UUID
    synergy_score: float
    created_at: datetime
    class Config:
        from_attributes = True

class MessageCreate(BaseModel):
    content: str

class MessageResponse(BaseModel):
    id: UUID
    sender_id: UUID
    content: str
    created_at: datetime
    read_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class NotificationResponse(BaseModel):
    id: UUID
    type: str
    metadata: dict
    is_read: bool
    created_at: datetime
    class Config:
        from_attributes = True
