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
    limit: int = Query(20, ge=1, le=50)
):
    """
    Fetch a ranked list of potential co-founders using the Synergy Engine.
    """
    profiles = MatchingService.get_discovery_queue(db, current_user.id, limit=limit)
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
