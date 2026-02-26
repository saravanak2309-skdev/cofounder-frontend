from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from app.api import deps
from app.db.session import get_db
from app.models.models import User, Match, ChatMessage, Profile
from app.schemas.schemas import MessageCreate, MessageResponse, ProfileResponse

router = APIRouter()

@router.get("/", response_model=List[ProfileResponse])
def get_my_matches(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    # Find all matches where current_user is either user_1 or user_2
    matches = db.query(Match).filter(
        (Match.user_1_id == current_user.id) | (Match.user_2_id == current_user.id)
    ).all()
    
    partner_ids = []
    for m in matches:
        partner_id = m.user_2_id if m.user_1_id == current_user.id else m.user_1_id
        partner_ids.append(partner_id)
        
    partners = db.query(Profile).filter(Profile.user_id.in_(partner_ids)).all()
    return partners

@router.get("/{partner_id}/messages", response_model=List[MessageResponse])
def get_chat_history(
    partner_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    match = db.query(Match).filter(
        ((Match.user_1_id == current_user.id) & (Match.user_2_id == partner_id)) |
        ((Match.user_1_id == partner_id) & (Match.user_2_id == current_user.id))
    ).first()
    
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
        
    messages = db.query(ChatMessage).filter(ChatMessage.match_id == match.id).order_by(ChatMessage.created_at).all()
    return messages

@router.post("/{partner_id}/messages", response_model=MessageResponse)
def send_message(
    partner_id: UUID,
    message_in: MessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    match = db.query(Match).filter(
        ((Match.user_1_id == current_user.id) & (Match.user_2_id == partner_id)) |
        ((Match.user_1_id == partner_id) & (Match.user_2_id == current_user.id))
    ).first()
    
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
        
    new_message = ChatMessage(
        match_id=match.id,
        sender_id=current_user.id,
        content=message_in.content
    )
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message
