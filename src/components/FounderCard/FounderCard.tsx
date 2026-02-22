import { useState } from 'react';
import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import type { Founder } from '../../types';
import SkillBadge from '../SkillBadge/SkillBadge';
import './FounderCard.css';

interface FounderCardProps {
    founder: Founder;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    isTop?: boolean;
    style?: React.CSSProperties;
}

const avatarColors: Record<string, string> = {
    Tech: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    Business: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    Design: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    Operations: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    Other: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
};

const FounderCard = ({ founder, onSwipeLeft, onSwipeRight, isTop = false, style }: FounderCardProps) => {
    const [expanded, setExpanded] = useState(false);
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-20, 20]);
    const likeOpacity = useTransform(x, [0, 100], [0, 1]);
    const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x > 100) {
            setSwipeDirection('right');
            setTimeout(() => onSwipeRight?.(), 300);
        } else if (info.offset.x < -100) {
            setSwipeDirection('left');
            setTimeout(() => onSwipeLeft?.(), 300);
        }
    };

    const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x > 30) setSwipeDirection('right');
        else if (info.offset.x < -30) setSwipeDirection('left');
        else setSwipeDirection(null);
    };

    const initials = founder.name.split(' ').map(n => n[0]).join('').toUpperCase();
    const avatarBg = avatarColors[founder.role] || avatarColors.Other;

    return (
        <motion.div
            className={`founder-card ${isTop ? 'top' : ''} ${swipeDirection ? `swipe-${swipeDirection}` : ''}`}
            style={{ x, rotate, ...style }}
            drag={isTop ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            onDrag={handleDrag}
            animate={swipeDirection ? { x: swipeDirection === 'right' ? 500 : -500, opacity: 0 } : {}}
            transition={{ duration: 0.3 }}
            whileHover={isTop ? { scale: 1.01 } : {}}
        >
            {/* Swipe Indicators */}
            {isTop && (
                <>
                    <motion.div className="swipe-indicator like-indicator" style={{ opacity: likeOpacity }}>
                        <span>CONNECT</span>
                        <span className="indicator-icon">🤝</span>
                    </motion.div>
                    <motion.div className="swipe-indicator nope-indicator" style={{ opacity: nopeOpacity }}>
                        <span className="indicator-icon">✕</span>
                        <span>PASS</span>
                    </motion.div>
                </>
            )}

            {/* Card Header */}
            <div className="card-header">
                <div className="card-avatar" style={{ background: avatarBg }}>
                    {founder.photoUrl ? (
                        <img src={founder.photoUrl} alt={founder.name} />
                    ) : (
                        <span className="avatar-initials">{initials}</span>
                    )}
                </div>
                <div className="card-identity">
                    <div className="card-name-row">
                        <h2 className="card-name">{founder.name}</h2>
                        {founder.age && <span className="card-age">{founder.age}</span>}
                    </div>
                    <div className="card-role-badge">
                        <span className="role-dot" style={{ background: avatarBg }}></span>
                        {founder.role} Founder
                    </div>
                    <p className="card-location">📍 {founder.location}</p>
                </div>
            </div>

            {/* Card Body */}
            <div className="card-body">
                <div className="card-info-row">
                    <div className="info-item">
                        <span className="info-icon">🎓</span>
                        <span className="info-text">{founder.education}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-icon">⏱️</span>
                        <span className="info-text">{founder.yearsOfExperience} yrs exp</span>
                    </div>
                </div>

                <div className="card-section">
                    <p className="section-label">Domain Expertise</p>
                    <div className="tag-row">
                        {founder.industries.map((ind) => (
                            <SkillBadge key={ind} label={ind} variant="domain" />
                        ))}
                    </div>
                </div>

                <div className="card-section">
                    <p className="section-label">Skills</p>
                    <div className="tag-row">
                        {founder.skills.slice(0, 4).map((skill) => (
                            <SkillBadge key={skill} label={skill} variant="skill" />
                        ))}
                        {founder.skills.length > 4 && (
                            <SkillBadge label={`+${founder.skills.length - 4}`} variant="more" />
                        )}
                    </div>
                </div>

                <div className="card-section">
                    <p className="section-label">Looking For</p>
                    <div className="tag-row">
                        {founder.lookingFor.map((role) => (
                            <SkillBadge key={role} label={role} variant="looking" />
                        ))}
                        <SkillBadge label={founder.commitment} variant="domain" />
                    </div>
                </div>

                <div className="card-bio">
                    <p className={`bio-text ${!expanded ? 'truncated' : ''}`}>
                        {founder.bio}
                    </p>
                    {founder.bio.length > 120 && (
                        <button className="read-more-btn" onClick={() => setExpanded(!expanded)}>
                            {expanded ? 'Show less' : 'Read more'}
                        </button>
                    )}
                </div>

                {founder.startupVision && (
                    <div className="card-vision">
                        <span className="vision-icon">💡</span>
                        <p className="vision-text">{founder.startupVision}</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default FounderCard;
