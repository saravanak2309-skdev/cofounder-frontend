from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.api import deps
from app.db.session import get_db
from app.models.models import User, Profile, UserRole
from app.schemas.schemas import ProfileResponse, SwipeCreate
from app.services.matching import MatchingService

router = APIRouter()

@router.get("/potential-matches", response_model=List[ProfileResponse])
def get_potential_matches(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user),
    role: Optional[UserRole] = None,
    location: Optional[str] = None,
    min_exp: Optional[int] = Query(0, ge=0),
    skills: Optional[List[str]] = Query(None),
    industries: Optional[List[str]] = Query(None),
):
    query = db.query(Profile).filter(Profile.user_id != current_user.id, Profile.is_visible == True)
    
    if role:
        query = query.filter(Profile.role == role)
    if location:
        query = query.filter(Profile.location.ilike(f"%{location}%"))
    if min_exp:
        query = query.filter(Profile.years_of_experience >= min_exp)
    
    # Filter by skills and industries (if using JSON in MySQL)
    # Note: For optimized many-to-many, we'd join junction tables
    # Here we use basic JSON contains if the DB supports it, or manual filtering
    profiles = query.all()
    
    # Filter logic for skills/industries
    if skills:
        profiles = [p for p in profiles if any(s in (p.skills or []) for s in skills)]
    if industries:
        profiles = [p for p in profiles if any(i in (p.industries or []) for i in industries)]
        
    return profiles

@router.post("/swipe")
def swipe_founder(
    *,
    db: Session = Depends(get_db),
    swipe_in: SwipeCreate,
    current_user: User = Depends(deps.get_current_user)
):
    match = MatchingService.process_swipe(db, current_user.id, swipe_in)
    if match:
        return {"status": "matched", "match_id": match.id}
    return {"status": "success"}
