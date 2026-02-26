from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, JSON, Enum, Float, BigInteger, Table
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
import uuid
from app.db.session import Base

class UserRole(str, enum.Enum):
    TECH = "Tech"
    BUSINESS = "Business"
    DESIGN = "Design"
    OPERATIONS = "Operations"

class StartupStage(str, enum.Enum):
    IDEA = "Idea"
    MVP = "MVP"
    EARLY_REVENUE = "Early Revenue"
    SCALING = "Scaling"

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    profile = relationship("Profile", back_populates="user", uselist=False)
    swipes_sent = relationship("Swipe", foreign_keys="[Swipe.swiper_id]", back_populates="swiper")
    notifications = relationship("Notification", back_populates="user")

class Profile(Base):
    __tablename__ = "profiles"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True)
    name = Column(String(255), nullable=False, index=True)
    role = Column(Enum(UserRole), nullable=False)
    location = Column(String(255), index=True)
    bio = Column(Text)
    years_of_experience = Column(Integer, default=0)
    education = Column(String(255))
    startup_vision = Column(Text)
    commitment = Column(String(50)) # Full-time, Part-time
    skills = Column(JSONB)  # GIN indexed for performance
    industries = Column(JSONB)
    looking_for = Column(JSONB)
    photo_url = Column(String(512), nullable=True)
    is_visible = Column(Boolean, default=True)
    startup_stage = Column(Enum(StartupStage), default=StartupStage.IDEA)
    last_active = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", back_populates="profile")

class Swipe(Base):
    __tablename__ = "swipes"
    id = Column(BigInteger, primary_key=True, index=True)
    swiper_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    swiped_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    direction = Column(String(10)) # 'left' or 'right'
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    swiper = relationship("User", foreign_keys=[swiper_id], back_populates="swipes_sent")

class Match(Base):
    __tablename__ = "matches"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_1_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    user_2_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    synergy_score = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    messages = relationship("ChatMessage", back_populates="match")

class ChatMessage(Base):
    __tablename__ = "chat_messages"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    match_id = Column(UUID(as_uuid=True), ForeignKey("matches.id"))
    sender_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    content = Column(Text, nullable=False)
    read_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    match = relationship("Match", back_populates="messages")

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    type = Column(String(50)) # 'match', 'message', 'alert'
    metadata = Column(JSONB)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="notifications")

class SavedFilter(Base):
    __tablename__ = "saved_filters"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    filter_name = Column(String(255))
    config = Column(JSONB)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
