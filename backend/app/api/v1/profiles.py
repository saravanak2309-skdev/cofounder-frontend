from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Any
from app.api import deps
from app.db.session import get_db
from app.models.models import User, Profile
from app.schemas.schemas import ProfileCreate, ProfileUpdate, ProfileResponse

router = APIRouter()

@router.get("/me", response_model=ProfileResponse)
def get_my_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.post("/me", response_model=ProfileResponse)
def create_my_profile(
    *,
    db: Session = Depends(get_db),
    profile_in: ProfileCreate,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if profile:
        raise HTTPException(status_code=400, detail="Profile already exists")
    
    new_profile = Profile(
        **profile_in.model_dump(),
        user_id=current_user.id
    )
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return new_profile

@router.patch("/me", response_model=ProfileResponse)
def update_my_profile(
    *,
    db: Session = Depends(get_db),
    profile_in: ProfileUpdate,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    update_data = profile_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(profile, field, value)
    
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile

@router.get("/{founder_id}", response_model=ProfileResponse)
def get_founder_profile(
    founder_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    profile = db.query(Profile).filter(Profile.user_id == founder_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Founder not found")
    return profile
