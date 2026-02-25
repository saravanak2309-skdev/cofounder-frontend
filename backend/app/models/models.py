from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, JSON, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base
import enum

class UserRole(str, enum.Enum):
    TECH = "Tech"
    BUSINESS = "Business"
    DESIGN = "Design"
    OPERATIONS = "Operations"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    profile = relationship("Profile", back_populates="user", uselist=False)

class Profile(Base):
    __tablename__ = "profiles"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    name = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    location = Column(String(255))
    bio = Column(Text)
    years_of_experience = Column(Integer, default=0)
    education = Column(String(255))
    startup_vision = Column(Text)
    skills = Column(JSON)  # List of strings
    industries = Column(JSON) # List of strings
    looking_for = Column(JSON) # List of roles
    photo_url = Column(String(512))
    is_visible = Column(Boolean, default=True)
    last_active = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", back_populates="profile")

class Swipe(Base):
    __tablename__ = "swipes"
    id = Column(Integer, primary_key=True, index=True)
    swiper_id = Column(Integer, ForeignKey("users.id"))
    swiped_id = Column(Integer, ForeignKey("users.id"))
    direction = Column(String(10)) # 'left' or 'right'
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Match(Base):
    __tablename__ = "matches"
    id = Column(Integer, primary_key=True, index=True)
    user_1_id = Column(Integer, ForeignKey("users.id"))
    user_2_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True, index=True)
    match_id = Column(Integer, ForeignKey("matches.id"))
    sender_id = Column(Integer, ForeignKey("users.id"))
    content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_read = Column(Boolean, default=False)
