import { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BoltIcon from '@mui/icons-material/Bolt';
import { mockFounders } from '../../data/mockFounders';
import './SwipeHeroCard.css';

const SwipeHeroCard = () => {
    const [index, setIndex] = useState(0);
    const [exitX, setExitX] = useState<number>(0);
    const founder = mockFounders[index % mockFounders.length];

    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

    const handleDragEnd = (_: any, info: any) => {
        if (info.offset.x > 100) {
            setExitX(200);
            setIndex(index + 1);
        } else if (info.offset.x < -100) {
            setExitX(-200);
            setIndex(index + 1);
        }
    };

    return (
        <div className="swipe-hero-stage">
            <AnimatePresence>
                <motion.div
                    key={index}
                    className="hero-card-animator"
                    style={{ x, rotate, opacity }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ x: exitX, opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                >
                    <div className="hero-card-premium">
                        <div className="card-image-placeholder">
                            <div className="hero-card-initials">{founder.name[0]}</div>
                        </div>
                        <div className="hero-card-content">
                            <div className="hero-card-header">
                                <h3>{founder.name}, {founder.age}</h3>
                                <span className="hero-card-role">{founder.role}</span>
                            </div>
                            <div className="hero-card-loc">
                                <LocationOnIcon style={{ fontSize: '1rem' }} /> {founder.location}
                            </div>
                            <p className="hero-card-bio">{founder.bio.slice(0, 100)}...</p>
                            <div className="hero-card-footer">
                                <div className="hero-card-tags">
                                    {founder.skills.slice(0, 3).map(s => <span key={s}>{s}</span>)}
                                </div>
                                <div className="hero-card-match">
                                    <BoltIcon style={{ fontSize: '1rem' }} /> 98% Match
                                </div>
                            </div>
                        </div>

                        {/* Swipe Prompt */}
                        <div className="hero-card-swipe-prompt">
                            <span>← Pass</span>
                            <span>Connect →</span>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Background stack decoration */}
            <div className="hero-card-shadow-1" />
            <div className="hero-card-shadow-2" />
        </div>
    );
};

export default SwipeHeroCard;
