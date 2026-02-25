import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import VerifiedIcon from '@mui/icons-material/Verified';
import type { Founder } from '../../types';
import './FounderCard.css';

interface FounderCardProps {
    founder: Founder;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    isTop?: boolean;
    style?: React.CSSProperties;
}

const FounderCard = ({ founder, onSwipeLeft, onSwipeRight, isTop = false, style }: FounderCardProps) => {

    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-15, 15]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

    // Smooth indicators for swipe intent
    const passOpacity = useTransform(x, [-60, -20], [1, 0]);
    const connectOpacity = useTransform(x, [20, 60], [0, 1]);

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (info.offset.x > 100) {
            setTimeout(() => onSwipeRight?.(), 200);
        } else if (info.offset.x < -100) {
            setTimeout(() => onSwipeLeft?.(), 200);
        } else {
        }
    };

    return (
        <motion.div
            className={`fc-container ${isTop ? 'is-top' : 'is-under'}`}
            style={{ x, rotate, opacity, ...style }}
            drag={isTop ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileHover={isTop ? { y: -5 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
            {/* Visual Feedback Overlays */}
            {isTop && (
                <>
                    <motion.div className="fc-overlay fc-overlay-pass" style={{ opacity: passOpacity }}>
                        <span>PASS</span>
                    </motion.div>
                    <motion.div className="fc-overlay fc-overlay-connect" style={{ opacity: connectOpacity }}>
                        <span>CONNECT</span>
                    </motion.div>
                </>
            )}

            {/* Profile Photo Section */}
            <div className="fc-photo-wrapper">
                <img
                    src={founder.photoUrl || `https://i.pravatar.cc/400?u=${founder.id}`}
                    alt={founder.name}
                    className="fc-photo"
                />
                <div className="fc-photo-overlay" />

                {/* Floating Badges */}
                <div className="fc-badges">
                    <div className="fc-badge fc-badge-role">
                        {founder.role}
                    </div>
                    {founder.yearsOfExperience >= 5 && (
                        <div className="fc-badge fc-badge-pro">
                            <VerifiedIcon style={{ fontSize: '1rem' }} /> PRO
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="fc-content">
                <header className="fc-header">
                    <div className="fc-title-row">
                        <h2 className="fc-name">{founder.name}</h2>
                        <span className="fc-match-pct">98% Match</span>
                    </div>
                    <div className="fc-meta-row">
                        <span className="fc-meta-item">
                            <LocationOnIcon fontSize="inherit" /> {founder.location}
                        </span>
                        <span className="fc-meta-dot">•</span>
                        <span className="fc-meta-item">
                            <AccessTimeIcon fontSize="inherit" /> {founder.yearsOfExperience}y Exp
                        </span>
                    </div>
                </header>

                <div className="fc-details-grid">
                    <div className="fc-detail">
                        <SchoolIcon className="fc-detail-icon" />
                        <div className="fc-detail-text">
                            <p className="fc-detail-label">Background</p>
                            <p className="fc-detail-val">{founder.education}</p>
                        </div>
                    </div>
                    <div className="fc-detail">
                        <BusinessCenterIcon className="fc-detail-icon" />
                        <div className="fc-detail-text">
                            <p className="fc-detail-label">Industry</p>
                            <p className="fc-detail-val">{founder.industries[0]}</p>
                        </div>
                    </div>
                </div>

                <div className="fc-tags-section">
                    <div className="fc-tag-group">
                        {founder.skills.slice(0, 3).map(skill => (
                            <span key={skill} className="fc-tag fc-tag-skill">{skill}</span>
                        ))}
                    </div>
                </div>

                <div className="fc-bio-section">
                    <p className="fc-bio-text">
                        {founder.bio.length > 120 ? `${founder.bio.substring(0, 120)}...` : founder.bio}
                    </p>
                </div>
            </div>

            {/* Bottom Glow Decoration */}
            <div className="fc-bottom-glow" />
        </motion.div>
    );
};

export default FounderCard;
