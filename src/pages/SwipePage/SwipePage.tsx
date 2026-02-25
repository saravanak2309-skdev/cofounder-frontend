import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import TuneIcon from '@mui/icons-material/Tune';
import UndoIcon from '@mui/icons-material/Undo';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FounderCard from '../../components/FounderCard/FounderCard';
import SwipeControls from '../../components/SwipeControls/SwipeControls';
import { mockFounders } from '../../data/mockFounders';
import type { Founder } from '../../types';
import FM_logo from '../../assets/FM_logo.png';
import './SwipePage.css';

const SwipePage = () => {
    const [founders, setFounders] = useState<Founder[]>([...mockFounders]);
    const [passed, setPassed] = useState<string[]>([]);
    const [matched, setMatched] = useState<string[]>([]);
    const [, setLastAction] = useState<'pass' | 'match' | null>(null);
    const [showMatch, setShowMatch] = useState<Founder | null>(null);

    const currentFounder = founders[0];
    const totalSeen = passed.length + matched.length;
    const totalFounders = mockFounders.length;
    const progressPct = totalFounders > 0 ? (totalSeen / totalFounders) * 100 : 0;

    const handlePass = useCallback(() => {
        if (!currentFounder) return;
        setPassed((p) => [...p, currentFounder.id]);
        setLastAction('pass');
        setFounders((prev) => prev.slice(1));
    }, [currentFounder]);

    const handleMatch = useCallback(() => {
        if (!currentFounder) return;
        setMatched((m) => [...m, currentFounder.id]);
        setLastAction('match');
        setShowMatch(currentFounder);
        setFounders((prev) => prev.slice(1));
        setTimeout(() => setShowMatch(null), 3000);
    }, [currentFounder]);

    const handleUndo = () => {
        setFounders((prev) => {
            const last = [...mockFounders].find(f => f.id === passed[passed.length - 1]);
            if (last) {
                setPassed(p => p.slice(0, -1));
                return [last, ...prev];
            }
            return prev;
        });
    };

    return (
        <div className="swipe-page">
            {/* Layered ambient background */}
            <div className="sp-bg">
                <div className="sp-glow sp-glow-tl" />
                <div className="sp-glow sp-glow-br" />
                <div className="sp-grid" />
                <div className="sp-vignette" />
            </div>

            {/* ── Header ── */}
            <header className="sp-header">
                <div className="sp-header-inner">
                    <Link to="/profile" className="sp-icon-btn">
                        <PersonIcon fontSize="small" />
                    </Link>

                    <div className="sp-header-center">
                        <div className="sp-brand">
                            <img src={FM_logo} alt="Founder's Matrimony" className="sp-logo" />
                            <span className="sp-brand-name">Discover</span>
                        </div>
                        <div className="sp-counters">
                            <span className="sp-counter sp-counter-pass">
                                <CloseIcon style={{ fontSize: '0.6rem' }} />
                                {passed.length}
                            </span>
                            <span className="sp-counter-sep" />
                            <span className="sp-counter sp-counter-match">
                                <FavoriteIcon style={{ fontSize: '0.6rem' }} />
                                {matched.length}
                            </span>
                        </div>
                    </div>

                    <Link to="/filters" className="sp-icon-btn">
                        <TuneIcon fontSize="small" />
                    </Link>
                </div>

                {/* Progress bar */}
                <div className="sp-progress-track">
                    <motion.div
                        className="sp-progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPct}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                </div>
            </header>

            {/* ── Card Area ── */}
            <div className="sp-card-area">
                {founders.length === 0 ? (
                    <motion.div
                        className="sp-empty"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="sp-empty-glow" />
                        <div className="sp-empty-icon">
                            <WorkspacePremiumIcon style={{ fontSize: '2.5rem' }} />
                        </div>
                        <h2 className="sp-empty-title">You've seen everyone!</h2>
                        <p className="sp-empty-desc">
                            You reviewed all available founders. Check your matches or broaden your filters.
                        </p>
                        <div className="sp-empty-stats">
                            <div className="sp-empty-stat">
                                <span className="sp-empty-stat-num" style={{ color: '#f87171' }}>{passed.length}</span>
                                <span className="sp-empty-stat-label">Passed</span>
                            </div>
                            <div className="sp-empty-stat-line" />
                            <div className="sp-empty-stat">
                                <span className="sp-empty-stat-num" style={{ color: '#34d399' }}>{matched.length}</span>
                                <span className="sp-empty-stat-label">Matched</span>
                            </div>
                        </div>
                        <div className="sp-empty-actions">
                            <Link to="/matches" className="sp-btn-primary">
                                View Matches ({matched.length}) <ArrowForwardIcon style={{ fontSize: '1rem' }} />
                            </Link>
                            <Link to="/filters" className="sp-btn-ghost">Adjust Filters</Link>
                        </div>
                    </motion.div>
                ) : (
                    <div className="sp-stack">
                        {/* Depth cards */}
                        {founders[2] && (
                            <div className="sp-depth-card sp-depth-2">
                                <FounderCard founder={founders[2]} isTop={false} />
                            </div>
                        )}
                        {founders[1] && (
                            <div className="sp-depth-card sp-depth-1">
                                <FounderCard founder={founders[1]} isTop={false} />
                            </div>
                        )}

                        {/* Top card */}
                        <AnimatePresence mode="popLayout">
                            {currentFounder && (
                                <FounderCard
                                    key={currentFounder.id}
                                    founder={currentFounder}
                                    isTop={true}
                                    onSwipeLeft={handlePass}
                                    onSwipeRight={handleMatch}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* Remaining count */}
                {founders.length > 0 && (
                    <div className="sp-remaining">
                        {founders.length} talent profiles remaining
                    </div>
                )}
            </div>

            {/* ── Footer Controls ── */}
            {founders.length > 0 && (
                <div className="sp-footer">
                    {/* Main controls */}
                    <SwipeControls onPass={handlePass} onConnect={handleMatch} />

                    {passed.length > 0 && (
                        <button className="sp-undo-btn" onClick={handleUndo}>
                            <UndoIcon style={{ fontSize: '0.85rem' }} />
                            Revisit last talent
                        </button>
                    )}
                </div>
            )}

            {/* ── Match Overlay ── */}
            <AnimatePresence>
                {showMatch && (
                    <motion.div
                        className="sp-match-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="sp-match-bg" />

                        {/* Particle burst */}
                        <div className="sp-match-particles">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="sp-particle"
                                    initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                                    animate={{
                                        scale: [0, 1, 0.5],
                                        x: Math.cos((i / 12) * Math.PI * 2) * (80 + Math.random() * 60),
                                        y: Math.sin((i / 12) * Math.PI * 2) * (80 + Math.random() * 60),
                                        opacity: [1, 1, 0],
                                    }}
                                    transition={{ duration: 0.9, delay: i * 0.04, ease: 'easeOut' }}
                                />
                            ))}
                        </div>

                        <motion.div
                            className="sp-match-card"
                            initial={{ scale: 0.75, y: 60, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.85, y: 40, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                        >
                            {/* Top glow */}
                            <div className="sp-match-card-glow" />

                            {/* Icon */}
                            <motion.div
                                className="sp-match-icon"
                                initial={{ scale: 0, rotate: -30 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                            >
                                <CelebrationIcon style={{ fontSize: '1.75rem' }} />
                            </motion.div>

                            <motion.h2
                                className="sp-match-headline"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                            >
                                It's a Match!
                            </motion.h2>

                            {/* Avatar */}
                            <motion.div
                                className="sp-match-avatar-wrap"
                                initial={{ scale: 0.7, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3, type: 'spring' }}
                            >
                                <div className="sp-match-avatar-ring">
                                    <img
                                        src={showMatch.photoUrl || `https://i.pravatar.cc/150?u=${showMatch.id}`}
                                        alt={showMatch.name}
                                    />
                                </div>
                                <div className="sp-match-avatar-pulse" />
                            </motion.div>

                            {/* Info */}
                            <motion.div
                                className="sp-match-info"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.38 }}
                            >
                                <h3 className="sp-match-name">{showMatch.name}</h3>
                                <p className="sp-match-meta">
                                    <span className="sp-match-role">{showMatch.role} Founder</span>
                                    <span className="sp-match-dot">•</span>
                                    <LocationOnIcon style={{ fontSize: '0.75rem', verticalAlign: 'middle' }} />
                                    {showMatch.location}
                                </p>
                            </motion.div>

                            <motion.p
                                className="sp-match-cta"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.45 }}
                            >
                                You both swiped right. Start the conversation!
                            </motion.p>

                            {/* CTA buttons */}
                            <motion.div
                                className="sp-match-btns"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link to="/matches" className="sp-match-btn-primary">
                                    <ChatBubbleOutlineIcon style={{ fontSize: '1rem' }} />
                                    Send a Message
                                </Link>
                                <button className="sp-match-btn-ghost" onClick={() => setShowMatch(null)}>
                                    Keep Discovering
                                </button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SwipePage;