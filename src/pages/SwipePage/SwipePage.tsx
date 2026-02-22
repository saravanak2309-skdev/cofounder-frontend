import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FounderCard from '../../components/FounderCard/FounderCard';
import SwipeControls from '../../components/SwipeControls/SwipeControls';
import { mockFounders } from '../../data/mockFounders';
import type { Founder } from '../../types';
import './SwipePage.css';

const SwipePage = () => {
    const [founders, setFounders] = useState<Founder[]>([...mockFounders]);
    const [passed, setPassed] = useState<string[]>([]);
    const [matched, setMatched] = useState<string[]>([]);
    const [, setLastAction] = useState<'pass' | 'match' | null>(null);
    const [showMatch, setShowMatch] = useState<Founder | null>(null);

    const currentFounder = founders[0];

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
        setTimeout(() => setShowMatch(null), 2500);
    }, [currentFounder]);

    const handleUndo = () => {
        // simple undo - just return the card
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
            {/* Top Bar */}
            <div className="swipe-topbar">
                <Link to="/profile" className="topbar-icon-btn">
                    <span>👤</span>
                    <span className="topbar-label">Profile</span>
                </Link>
                <div className="swipe-progress">
                    <span className="progress-count">{founders.length} remaining</span>
                </div>
                <Link to="/filters" className="topbar-icon-btn">
                    <span>⚡</span>
                    <span className="topbar-label">Filters</span>
                </Link>
            </div>

            {/* Stats bar */}
            <div className="swipe-stats">
                <div className="swipe-stat">
                    <span className="stat-val passed">{passed.length}</span>
                    <span className="stat-label">Passed</span>
                </div>
                <div className="swipe-stat">
                    <span className="stat-val matched">{matched.length}</span>
                    <span className="stat-label">Matched</span>
                </div>
            </div>

            {/* Card area */}
            <div className="swipe-card-area">
                {founders.length === 0 ? (
                    <div className="no-more-cards">
                        <div className="no-more-icon">🎯</div>
                        <h2>You've seen everyone!</h2>
                        <p>Check your matches or adjust filters to see more founders.</p>
                        <div className="no-more-actions">
                            <Link to="/matches" className="btn-primary">View Matches ({matched.length})</Link>
                            <Link to="/filters" className="btn-secondary">Update Filters</Link>
                        </div>
                    </div>
                ) : (
                    <div className="cards-stack">
                        {/* Background cards for depth effect */}
                        {founders[2] && (
                            <div className="card-offset offset-2">
                                <FounderCard founder={founders[2]} isTop={false} />
                            </div>
                        )}
                        {founders[1] && (
                            <div className="card-offset offset-1">
                                <FounderCard founder={founders[1]} isTop={false} />
                            </div>
                        )}
                        <AnimatePresence mode="wait">
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
            </div>

            {/* Controls */}
            {founders.length > 0 && (
                <div className="swipe-footer">
                    <SwipeControls onPass={handlePass} onConnect={handleMatch} />
                    {passed.length > 0 && (
                        <button className="undo-btn" onClick={handleUndo}>
                            ↩ Undo last pass
                        </button>
                    )}
                </div>
            )}

            {/* Match notification */}
            <AnimatePresence>
                {showMatch && (
                    <motion.div
                        className="match-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="match-popup"
                            initial={{ scale: 0.7, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.7, y: 50 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <div className="match-confetti">🎉</div>
                            <h2 className="match-title">It's a Match!</h2>
                            <p className="match-name">{showMatch.name}</p>
                            <p className="match-role">{showMatch.role} Founder • {showMatch.location}</p>
                            <p className="match-msg">Start a conversation before this moment disappears.</p>
                            <Link to="/matches" className="match-chat-btn">
                                💬 Start Chatting
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SwipePage;
