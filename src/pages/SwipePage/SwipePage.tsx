import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import VerifiedIcon from '@mui/icons-material/Verified';
import { mockFounders } from '../../data/mockFounders';
import FounderCard from '../../components/FounderCard/FounderCard';
import type { Founder } from '../../types';
import './SwipePage.css';

const SwipePage = () => {
    const [founders, setFounders] = useState<Founder[]>([...mockFounders]);
    const [showMatchOverlay, setShowMatchOverlay] = useState<Founder | null>(null);

    const handleSwipe = (direction: 'left' | 'right') => {
        const currentFounder = founders[0];
        if (!currentFounder) return;

        if (direction === 'right') {
            setShowMatchOverlay(currentFounder);
        }

        setFounders(prev => prev.slice(1));
    };

    return (
        <div className="discovery-console">
            {/* ── CONSOLE HEADER ── */}
            <header className="console-nav glass">
                <div className="nav-inner">
                    <div className="nav-left">
                        <div className="console-status">
                            <span className="status-dot animate-pulse" />
                            <span className="status-text">Discovery Protocol Active</span>
                        </div>
                    </div>

                    <div className="nav-center">
                        <span className="protocol-title">VENTURE ALIGNMENT</span>
                    </div>

                    <div className="nav-right">
                        <button className="nav-icon-btn filter-active">
                            <TuneIcon />
                            <span className="btn-label">Refine</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* ── MAIN STAGE ── */}
            <main className="console-stage">
                <div className="stage-background">
                    <div className="stage-glow" />
                </div>

                <div className="card-stack-container">
                    <AnimatePresence>
                        {founders.length > 0 ? (
                            founders.slice(0, 2).reverse().map((f, idx) => (
                                <FounderCard
                                    key={f.id}
                                    founder={f}
                                    isTop={idx === 1 || founders.length === 1}
                                    onSwipeLeft={() => handleSwipe('left')}
                                    onSwipeRight={() => handleSwipe('right')}
                                />
                            ))
                        ) : (
                            <motion.div
                                className="empty-protocol glass"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <VerifiedIcon className="empty-icon" />
                                <h2>Network Analysis Complete</h2>
                                <p>You have reviewed all high-alignment profiles in your current Tier-1 ecosystem.</p>
                                <div className="empty-cta">
                                    <button className="btn-premium btn-premium-primary" onClick={() => setFounders([...mockFounders])}>
                                        Expand Global Reach
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ── ACTION OVERLAYS ── */}
                {founders.length > 0 && (
                    <div className="action-hub">
                        <motion.button
                            className="hub-btn hub-pass"
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleSwipe('left')}
                        >
                            <CloseIcon fontSize="large" />
                        </motion.button>

                        <div className="hub-divider" />

                        <motion.button
                            className="hub-btn hub-connect"
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleSwipe('right')}
                        >
                            <FavoriteIcon fontSize="large" />
                        </motion.button>
                    </div>
                )}
            </main>

            {/* ── MATCH CELEBRATION ── */}
            <AnimatePresence>
                {showMatchOverlay && (
                    <motion.div
                        className="match-celebration"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="celebration-card glass shadow-premium"
                            initial={{ scale: 0.8, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                        >
                            <CelebrationIcon className="victory-icon" />
                            <h2 className="text-gradient">Strategic Alliance!</h2>
                            <p>Mutual interest confirmed with <strong>{showMatchOverlay.name}</strong>. Your venture synergies are off the charts.</p>

                            <div className="celebration-visual">
                                <div className="founder-circle">YOU</div>
                                <div className="synergy-line">
                                    <span className="pulse-atom" />
                                </div>
                                <div className="founder-circle">{showMatchOverlay.name[0]}</div>
                            </div>

                            <div className="celebration-actions">
                                <Link to="/matches" className="btn-premium btn-premium-primary full-width">
                                    <ChatBubbleOutlineIcon /> INITIATE STRATEGIC SYNC
                                </Link>
                                <button className="btn-premium btn-premium-secondary full-width" onClick={() => setShowMatchOverlay(null)}>
                                    CONTINUE DISCOVERY
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SwipePage;
