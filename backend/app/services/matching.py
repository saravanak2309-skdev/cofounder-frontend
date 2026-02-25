from sqlalchemy.orm import Session
from app.models.models import Swipe, Match, User
from app.schemas.schemas import SwipeCreate
from typing import Optional

class MatchingService:
    @staticmethod
    def process_swipe(db: Session, swiper_id: int, swipe_in: SwipeCreate) -> Optional[Match]:
        # 1. Record the swipe
        swipe = Swipe(
            swiper_id=swiper_id,
            swiped_id=swipe_in.swiped_id,
            direction=swipe_in.direction
        )
        db.add(swipe)
        
        # 2. Check for match if direction is 'right'
        if swipe_in.direction == 'right':
            reverse_swipe = db.query(Swipe).filter(
                Swipe.swiper_id == swipe_in.swiped_id,
                Swipe.swiped_id == swiper_id,
                Swipe.direction == 'right'
            ).first()
            
            if reverse_swipe:
                # IT'S A MATCH!
                match = Match(user_1_id=swiper_id, user_2_id=swipe_in.swiped_id)
                db.add(match)
                db.commit()
                return match
        
        db.commit()
        return None

    @staticmethod
    def get_potential_founders(db: Session, current_user_id: int, filters: dict):
        # Implementation of advanced filtering logic
        query = db.query(User).filter(User.id != current_user_id)
        # Apply filters based on Profile attributes...
        # This would involve joining with the Profile table
        return query.all()
