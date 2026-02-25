from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
from app.models.models import UserRole

# Auth Schemas
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[str] = None

# Profile Schemas
class ProfileBase(BaseModel):
    name: str
    role: UserRole
    location: Optional[str] = None
    bio: Optional[str] = None
    years_of_experience: int = 0
    education: Optional[str] = None
    startup_vision: Optional[str] = None
    skills: List[str] = []
    industries: List[str] = []
    looking_for: List[UserRole] = []
    photo_url: Optional[str] = None
    is_visible: bool = True

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
    skills: Optional[List[str]] = None
    industries: Optional[List[str]] = None
    looking_for: Optional[List[UserRole]] = None
    photo_url: Optional[str] = None
    is_visible: Optional[bool] = None

class ProfileResponse(ProfileBase):
    id: int
    user_id: int
    last_active: Optional[datetime] = None
    class Config:
        from_attributes = True

# Interaction Schemas
class SwipeCreate(BaseModel):
    swiped_id: int
    direction: str # 'left' or 'right'

class MessageCreate(BaseModel):
    content: str

class MessageResponse(BaseModel):
    id: int
    sender_id: int
    content: str
    created_at: datetime
    is_read: bool
    class Config:
        from_attributes = True
