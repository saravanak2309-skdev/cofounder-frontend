from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.models import Swipe, Match, User, Profile, UserRole
from app.schemas.schemas import SwipeCreate
from typing import List, Optional
import json

class MatchingService:
    @staticmethod
    def calculate_synergy_score(profile1: Profile, profile2: Profile) -> float:
        """
        Match Score Formula (The "Synergy Index")
        Score = (RoleComp * 0.4) + (DomainOverlap * 0.2) + (VisionAlign * 0.2) + (ExperienceBalance * 0.1) + (CommitmentSync * 0.1)
        """
        score = 0.0

        # 1. Role Complementarity (40%)
        role_score = 0.3
        pairs = {profile1.role, profile2.role}
        if UserRole.TECH in pairs and UserRole.BUSINESS in pairs:
            role_score = 1.0
        elif UserRole.TECH in pairs and UserRole.DESIGN in pairs:
            role_score = 0.9
        elif UserRole.BUSINESS in pairs and UserRole.OPERATIONS in pairs:
            role_score = 0.8
        score += role_score * 0.4

        # 2. Domain Overlap (20%)
        if profile1.industries and profile2.industries:
            ind1 = set(profile1.industries)
            ind2 = set(profile2.industries)
            overlap = ind1.intersection(ind2)
            union = ind1.union(ind2)
            if union:
                score += (len(overlap) / len(union)) * 0.2

        # 3. Vision Alignment (20%) - Stub for NLP embedding similarity
        # For now, keyword overlap in bio/vision
        vision1 = set((profile1.startup_vision or "").lower().split())
        vision2 = set((profile2.startup_vision or "").lower().split())
        if vision1 and vision2:
            overlap = vision1.intersection(vision2)
            score += (min(len(overlap) / 10, 1.0)) * 0.2

        # 4. Experience Balance (10%)
        # Preference for one senior (5y+) and one hungry/energetic (2y+) or two seniors
        total_exp = profile1.years_of_experience + profile2.years_of_experience
        if total_exp > 10:
            score += 0.1
        elif total_exp > 5:
            score += 0.05

        # 5. Commitment Sync (10%)
        if profile1.commitment == profile2.commitment:
            score += 0.1

        return round(score, 2)

    @staticmethod
    def process_swipe(db: Session, swiper_id: str, swipe_in: SwipeCreate) -> Optional[Match]:
        # Record the swipe
        swipe = Swipe(
            swiper_id=swiper_id,
            swiped_id=swipe_in.swiped_id,
            direction=swipe_in.direction
        )
        db.add(swipe)
        db.flush() # Get ID without committing
        
        if swipe_in.direction == 'right':
            # Check for mutual swipe
            reverse_swipe = db.query(Swipe).filter(
                Swipe.swiper_id == swipe_in.swiped_id,
                Swipe.swiped_id == swiper_id,
                Swipe.direction == 'right'
            ).first()
            
            if reverse_swipe:
                # Calculate synergy score
                p1 = db.query(Profile).filter(Profile.user_id == swiper_id).first()
                p2 = db.query(Profile).filter(Profile.user_id == swipe_in.swiped_id).first()
                synergy = MatchingService.calculate_synergy_score(p1, p2) if p1 and p2 else 0.5

                match = Match(
                    user_1_id=swiper_id, 
                    user_2_id=swipe_in.swiped_id,
                    synergy_score=synergy
                )
                db.add(match)
                db.commit()
                return match
        
        db.commit()
        return None

    @staticmethod
    def get_discovery_queue(db: Session, current_user_id: str, limit: int = 20) -> List[Profile]:
        # Multi-stage ranking:
        # 1. Users who already liked current_user (Hidden Discovery)
        # 2. Users with high synergy potential
        # 3. Exclude already swiped
        
        swiped_ids = db.query(Swipe.swiped_id).filter(Swipe.swiper_id == current_user_id).all()
        exclude_ids = [s[0] for s in swiped_ids] + [current_user_id]

        # Prioritize "Likes you"
        likers_query = db.query(Profile).join(Swipe, Profile.user_id == Swipe.swiper_id).filter(
            Swipe.swiped_id == current_user_id,
            Swipe.direction == 'right',
            Profile.user_id.notin_(exclude_ids)
        ).limit(limit)

        likers = likers_query.all()
        if len(likers) >= limit:
            return likers

        # Fill with general discovery
        others = db.query(Profile).filter(
            Profile.user_id.notin_(exclude_ids + [p.user_id for p in likers])
        ).order_by(func.random()).limit(limit - len(likers)).all()

        return likers + others
