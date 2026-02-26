import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';
import BoltIcon from '@mui/icons-material/Bolt';
import WorkIcon from '@mui/icons-material/Work';
import PsychologyIcon from '@mui/icons-material/Psychology';
import type { Founder } from '../../types';
import './FounderCard.css';

interface FounderCardProps {
    founder: Founder;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    isTop?: boolean;
}

const FounderCard = ({ founder, onSwipeLeft, onSwipeRight, isTop = false }: FounderCardProps) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-10, 10]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
    const passOpacity = useTransform(x, [-80, -30], [1, 0]);
    const connectOpacity = useTransform(x, [30, 80], [0, 1]);

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (info.offset.x > 120) {
            onSwipeRight?.();
        } else if (info.offset.x < -120) {
            onSwipeLeft?.();
        }
    };

    const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

    return (
        <motion.div
            className={`founder-card glass ${isTop ? 'is-top' : ''}`}
            style={{ x, rotate, opacity }}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileHover={isTop ? { scale: 1.02 } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
            {/* Visual Overlays for Swipe Feedback */}
            {isTop && (
                <>
                    <motion.div
                        className="swipe-overlay overlay-pass"
                        style={{ opacity: passOpacity }}
                    >
                        PASS
                    </motion.div>
                    <motion.div
                        className="swipe-overlay overlay-connect"
                        style={{ opacity: connectOpacity }}
                    >
                        CONNECT
                    </motion.div>
                </>
            )}

            {/* CARD IMAGE SECTION */}
            <div className="fc-image-container">
                {founder.photoUrl ? (
                    <img src={founder.photoUrl} alt={founder.name} className="fc-photo" />
                ) : (
                    <div className="fc-photo-placeholder">
                        <span>{getInitials(founder.name)}</span>
                    </div>
                )}
                <div className="fc-image-overlay" />

                <div className="fc-top-badges">
                    <div className="fc-badge-pill role-badge">
                        <PsychologyIcon fontSize="inherit" /> {founder.role}
                    </div>
                    <div className="fc-badge-pill synergy-badge">
                        <BoltIcon fontSize="inherit" /> 98% Match
                    </div>
                </div>

                <div className="fc-image-content">
                    <h2 className="fc-name">{founder.name}, {founder.age || 30}</h2>
                    <div className="fc-location-row">
                        <LocationOnIcon fontSize="inherit" /> {founder.location}
                    </div>
                </div>
            </div>

            {/* CARD DATA SECTION */}
            <div className="fc-details-area">
                <div className="fc-meta-grid">
                    <div className="fc-meta-item">
                        <SchoolIcon className="meta-icon" />
                        <div className="meta-data">
                            <span className="meta-label">Education</span>
                            <span className="meta-val">{founder.education}</span>
                        </div>
                    </div>
                    <div className="fc-meta-item">
                        <AccessTimeIcon className="meta-icon" />
                        <div className="meta-data">
                            <span className="meta-label">Experience</span>
                            <span className="meta-val">{founder.yearsOfExperience}y tenure</span>
                        </div>
                    </div>
                </div>

                <div className="fc-tag-section">
                    <span className="section-label">Target Industry</span>
                    <div className="fc-tags">
                        {founder.industries.map(ind => (
                            <span key={ind} className="tag-pill industry-tag">{ind}</span>
                        ))}
                    </div>
                </div>

                <div className="fc-tag-section">
                    <span className="section-label">Core Expertise</span>
                    <div className="fc-tags">
                        {founder.skills.map(skill => (
                            <span key={skill} className="tag-pill skill-tag">{skill}</span>
                        ))}
                    </div>
                </div>

                <div className="fc-bio-box">
                    <span className="section-label">Venture Vision</span>
                    <p>{founder.bio}</p>
                </div>
            </div>

            <div className="fc-trust-footer">
                <VerifiedIcon fontSize="inherit" className="verified-icon" />
                <span>Verified Strategic Match</span>
            </div>

            <div className="fc-corner-glow" />
        </motion.div>
    );
};

export default FounderCard;
