import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VerifiedIcon from '@mui/icons-material/Verified';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PsychologyIcon from '@mui/icons-material/Psychology';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import BoltIcon from '@mui/icons-material/Bolt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DiamondIcon from '@mui/icons-material/Diamond';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import HandshakeIcon from '@mui/icons-material/Handshake';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import FM_logo from '../../assets/FM_logo.png';
import FounderCard from '../../components/FounderCard/FounderCard';
import { mockFounders } from '../../data/mockFounders';
import './LandingPage.css';

/* ── DATA ─────────────────────────────────────────────── */
const criteriaItems = [
    { icon: <LocationOnIcon />,     label: 'Location'   },
    { icon: <SchoolIcon />,         label: 'Alma Mater' },
    { icon: <AccessTimeIcon />,     label: 'Tenure'     },
    { icon: <PsychologyIcon />,     label: 'Mindset'    },
    { icon: <BusinessCenterIcon />, label: 'Domain'     },
    { icon: <BoltIcon />,           label: 'Skills'     },
];

const featureCards = [
    {
        icon: <DiamondIcon />,
        tag: 'Precision Matching',
        title: 'Verified Profiles',
        desc: 'Every founder is manually vetted for domain expertise and founding readiness.',
        cta: 'Browse Network',
    },
    {
        icon: <TrackChangesIcon />,
        tag: 'Smart Filters',
        title: 'Multi-Dimensional Fit',
        desc: 'Filter by location, alma mater, mindset, domain, skills and 20+ more signals.',
        cta: 'Try Filters',
        highlight: true,
    },
    {
        icon: <HandshakeIcon />,
        tag: 'Legal Ready',
        title: 'Alliance Framework',
        desc: 'Pre-vetted legal templates to formalize equity splits and roles from day one.',
        cta: 'Learn More',
    },
    {
        icon: <AutoAwesomeIcon />,
        tag: 'AI Powered',
        title: 'Compatibility Score',
        desc: 'Proprietary algorithms surface your highest-potential founding matches first.',
        cta: 'See How',
    },
];

const steps = [
    {
        icon: <TravelExploreIcon />,
        title: 'Protocol Setup',
        desc: 'Define your founder DNA, expertise gaps, and startup vision through our verified framework.',
    },
    {
        icon: <GroupIcon />,
        title: 'Strategic Discovery',
        desc: 'Screen elite cofounders using high-precision filters and multi-dimensional compatibility scores.',
    },
    {
        icon: <RocketLaunchIcon />,
        title: 'Launch Alliance',
        desc: 'Formalize partnerships with pre-vetted legal support to start building at venture speed.',
    },
];

/* ── ANIMATION VARIANTS ───────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
    hidden: {},
    show:   { transition: { staggerChildren: 0.1 } },
};
const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    show:   { opacity: 1, x: 0,  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};
const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    show:   { opacity: 1, x: 0,  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

/* ── COMPONENT ────────────────────────────────────────── */
const LandingPage = () => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const [scrolled,    setScrolled]    = useState(false);
    const cursorRef     = useRef(null);
    const cursorTarget  = useRef({ x: -500, y: -500 });
    const cursorCurrent = useRef({ x: -500, y: -500 });
    const rafRef        = useRef(null);

    /* Carousel auto-play */
    useEffect(() => {
        const t = setInterval(() => setActiveIndex(p => (p + 1) % mockFounders.length), 4500);
        return () => clearInterval(t);
    }, []);

    /* Nav scroll state */
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    /* Smooth cursor glow */
    useEffect(() => {
        const onMove = e => { cursorTarget.current = { x: e.clientX, y: e.clientY }; };
        window.addEventListener('mousemove', onMove, { passive: true });
        const loop = () => {
            cursorCurrent.current.x += (cursorTarget.current.x - cursorCurrent.current.x) * 0.08;
            cursorCurrent.current.y += (cursorTarget.current.y - cursorCurrent.current.y) * 0.08;
            if (cursorRef.current) {
                cursorRef.current.style.left = cursorCurrent.current.x + 'px';
                cursorRef.current.style.top  = cursorCurrent.current.y + 'px';
            }
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    /* Floating particles */
    useEffect(() => {
        const colors = ['rgba(56,189,248,', 'rgba(129,140,248,', 'rgba(6,182,212,'];
        const particles = Array.from({ length: 20 }, () => {
            const p     = document.createElement('div');
            p.className = 'fm-particle';
            const size  = Math.random() * 3 + 1;
            const col   = colors[Math.floor(Math.random() * colors.length)];
            const op    = (Math.random() * 0.35 + 0.1).toFixed(2);
            p.style.cssText = `
                width:${size}px;height:${size}px;
                left:${(Math.random() * 100).toFixed(1)}%;
                background:${col}${op});
                box-shadow:0 0 ${size * 4}px ${col}${op});
                --dur:${(Math.random() * 22 + 14).toFixed(1)}s;
                --op:${op};
                animation-delay:${(Math.random() * -35).toFixed(1)}s;
            `;
            document.body.appendChild(p);
            return p;
        });
        return () => particles.forEach(p => p.remove());
    }, []);

    return (
        <div className="landing-page">
            <div ref={cursorRef} className="cursor-glow" />
            <div className="bg-glow bg-glow-1" />
            <div className="bg-glow bg-glow-2" />

            {/* ════════════════════════════════════
                NAV — logo prominent top-left
            ════════════════════════════════════ */}
            <motion.nav
                className={`landing-nav${scrolled ? ' scrolled' : ''}`}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0,   opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
                <a href="/" className="nav-logo">
                    <img src={FM_logo} alt="FM" className="nav-logo-img" />
                    <div className="nav-logo-text-wrap">
                        <span className="nav-logo-name">Founder</span>
                        <span className="nav-logo-sub">Matrimony</span>
                    </div>
                </a>

                <ul className="nav-links">
                    <li><a href="#how-it-works">Process</a></li>
                    <li><a href="#network">Network</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="/filters">Explore</a></li>
                </ul>

                <button className="btn-nav-cta" onClick={() => navigate('/create-profile')}>
                    Get Started
                </button>
            </motion.nav>

            {/* ════════════════════════════════════
                HERO — 3 columns
            ════════════════════════════════════ */}
            <section className="hero-section">
                <div className="hero-grid-3col">

                    {/* COL 1 — stacked headline + copy */}
                    <motion.div
                        className="hero-col hero-col-left"
                        variants={stagger}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.div className="hero-badge" variants={fadeLeft}>
                            <span className="badge-dot" />
                            <VerifiedIcon style={{ fontSize: 14 }} />
                            Elite Discovery Ecosystem
                        </motion.div>

                        <motion.h1 className="hero-title-stacked" variants={fadeLeft}>
                            <span className="stack-word">Find.</span>
                            <span className="stack-word stack-gradient">Match.</span>
                            <span className="stack-word">Build.</span>
                        </motion.h1>

                        <motion.p className="hero-subtitle" variants={fadeLeft}>
                            Founder Matrimony is the high-trust alternative to casual discovery.
                            Find partners verified by domain, tenure, and strategic vision —
                            built for India's top 1% builder ecosystem.
                        </motion.p>

                        <motion.div className="hero-stats" variants={fadeLeft}>
                            {[
                                { num: '1.2K+', label: 'Verified Founders' },
                                { num: '94%',   label: 'Match Quality'     },
                                { num: '340+',  label: 'Teams Formed'      },
                            ].map((s, i) => (
                                <div className="hero-stat" key={i}>
                                    <span className="hero-stat-num">{s.num}</span>
                                    <span className="hero-stat-label">{s.label}</span>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div className="hero-actions" variants={fadeLeft}>
                            <motion.button
                                className="btn-primary-glow"
                                onClick={() => navigate('/create-profile')}
                                whileHover={{ scale: 1.04, y: -3 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Initiate Protocol <ArrowForwardIcon style={{ fontSize: 18 }} />
                            </motion.button>
                            <motion.button
                                className="btn-ghost-outline"
                                onClick={() => navigate('/filters')}
                                whileHover={{ scale: 1.03, y: -2 }}
                            >
                                Explore Pool
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* COL 2 — big logo with orbits (center) */}
                    <motion.div
                        className="hero-col hero-col-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                    >
                        <div className="hero-logo-display">
                            <div className="logo-display-glow" />

                            <div className="logo-orbit logo-orbit-1">
                                <div className="logo-orbit-dot" />
                            </div>
                            <div className="logo-orbit logo-orbit-2">
                                <div className="logo-orbit-dot logo-orbit-dot-2" />
                            </div>
                            <div className="logo-orbit logo-orbit-3" />

                            <motion.div
                                className="logo-centerpiece"
                                animate={{ y: [0, -18, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <img src={FM_logo} alt="Founder Matrimony" className="logo-big" />
                                <div className="logo-inner-glow" />
                            </motion.div>

                            <div className="logo-pedestal">
                                <div className="pedestal-ring pedestal-ring-1" />
                                <div className="pedestal-ring pedestal-ring-2" />
                                <div className="pedestal-shadow" />
                            </div>

                            <motion.div
                                className="float-chip float-chip-1"
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <VerifiedIcon style={{ fontSize: 14, color: 'var(--primary)' }} />
                                <span>340+ Alliances</span>
                            </motion.div>

                            <motion.div
                                className="float-chip float-chip-2"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                            >
                                <BoltIcon style={{ fontSize: 14, color: 'var(--secondary)' }} />
                                <span>94% Match Rate</span>
                            </motion.div>

                            <motion.div
                                className="float-chip float-chip-3"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                            >
                                <GroupIcon style={{ fontSize: 14, color: 'var(--accent)' }} />
                                <span>1.2K+ Founders</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* COL 3 — profile swipe carousel */}
                    <motion.div
                        className="hero-col hero-col-right"
                        variants={fadeRight}
                        initial="hidden"
                        animate="show"
                    >
                        <div className="hero-right-label">
                            <span className="badge-dot" /> Verified Builder Network
                        </div>

                        <div className="hero-profile-carousel-container">
                            <div className="hero-carousel-slot">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, y: 28, scale: 0.95, rotate: 2 }}
                                        animate={{ opacity: 1, y: 0,  scale: 1,    rotate: 0 }}
                                        exit={{    opacity: 0, y: -20, scale: 0.95, rotate: -2 }}
                                        transition={{ duration: 0.55, ease: 'circOut' }}
                                        style={{ width: '100%', height: '100%' }}
                                    >
                                        <FounderCard founder={mockFounders[activeIndex]} isTop={false} />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <div className="carousel-indicators">
                                {mockFounders.slice(0, 5).map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`indicator-dot${activeIndex === idx ? ' active' : ''}`}
                                        onClick={() => setActiveIndex(idx)}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* INLINE SIGNUP BAR */}
                <motion.div
                    className="inline-signup-bar"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="signup-bar-grid">
                        <div className="bar-field">
                            <label>Identity</label>
                            <input type="text" placeholder="Full Name" />
                        </div>
                        <div className="bar-divider" />
                        <div className="bar-field">
                            <label>Professional Link</label>
                            <input type="text" placeholder="Email / LinkedIn" />
                        </div>
                        <div className="bar-divider" />
                        <div className="bar-field">
                            <label>Designation</label>
                            <select>
                                <option>Tech Founder</option>
                                <option>Business Founder</option>
                                <option>Design Founder</option>
                                <option>Ops / Other</option>
                            </select>
                        </div>
                        <div className="bar-divider" />
                        <div className="bar-field field-expand">
                            <label>Venture Needs</label>
                            <input type="text" placeholder="e.g. Fintech Tech Partner" />
                        </div>
                        <motion.button
                            className="btn-bar-action"
                            onClick={() => navigate('/create-profile')}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            INITIATE PROTOCOL <ArrowForwardIcon style={{ fontSize: 16 }} />
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div
                    className="scroll-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                    onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
                >
                    <span>Scroll</span>
                    <div className="scroll-indicator-line" />
                    <KeyboardArrowDownIcon style={{ fontSize: 18, color: 'var(--primary)', opacity: 0.6 }} />
                </motion.div>
            </section>

            {/* ════════════════════════════════════
                FEATURE CARDS ROW
            ════════════════════════════════════ */}
            <section className="feature-cards-section">
                <motion.div
                    className="feature-cards-grid"
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    {featureCards.map((card, i) => (
                        <motion.div
                            key={i}
                            className={`feature-card${card.highlight ? ' feature-card-highlight' : ''}`}
                            variants={fadeUp}
                            whileHover={{ y: -8, transition: { duration: 0.28 } }}
                        >
                            <div className="fc-top">
                                <span className="fc-tag">{card.tag}</span>
                                <div className="fc-icon">{card.icon}</div>
                            </div>
                            <h3 className="fc-title">{card.title}</h3>
                            <p className="fc-desc">{card.desc}</p>
                            <button className="fc-cta" onClick={() => navigate('/filters')}>
                                {card.cta} <ArrowForwardIcon style={{ fontSize: 14 }} />
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ════════════════════════════════════
                CRITERIA STRIP
            ════════════════════════════════════ */}
            <section className="criteria-strip">
                <div className="strip-container">
                    <motion.div
                        className="strip-content"
                        animate={{ x: [0, -1200] }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    >
                        {[...criteriaItems, ...criteriaItems, ...criteriaItems].map((item, idx) => (
                            <div key={idx} className="criteria-pill">
                                <span className="pill-icon">{item.icon}</span>
                                <span className="pill-label">{item.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════
                HOW IT WORKS
            ════════════════════════════════════ */}
            <section className="how-it-works" id="how-it-works">
                <motion.div
                    className="section-header"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <span className="section-label">Process</span>
                    <h2>Venture Alignment <span className="highlight">Framework</span></h2>
                    <p>India's most systematic approach to founding team development.</p>
                </motion.div>

                <motion.div
                    className="steps-grid"
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            className="step-card"
                            variants={fadeUp}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                        >
                            <div className="step-icon-wrap">{step.icon}</div>
                            <div className="step-number">0{idx + 1}</div>
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ════════════════════════════════════
                FOUNDER CAROUSEL
            ════════════════════════════════════ */}
            <section className="founder-carousel" id="network">
                <motion.div
                    className="section-header"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <span className="section-label">Network</span>
                    <h2>Elite <span className="highlight">Network Reach</span></h2>
                    <p>Direct access to verified builders from the world's leading ecosystems.</p>
                </motion.div>

                <div className="carousel-track-wrapper">
                    <div className="carousel-track animate-scroll">
                        {[...mockFounders, ...mockFounders, ...mockFounders].map((f, idx) => (
                            <motion.div
                                key={idx}
                                className="carousel-card-wrap"
                                whileHover={{ y: -12, scale: 1.04, transition: { duration: 0.3 } }}
                            >
                                <FounderCard founder={f} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════
                CTA
            ════════════════════════════════════ */}
            <section className="cta-section">
                <motion.div
                    className="cta-card"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <motion.img
                        src={FM_logo}
                        alt="Logo"
                        className="cta-logo"
                        animate={{
                            filter: [
                                'drop-shadow(0 0 10px rgba(56,189,248,0.4))',
                                'drop-shadow(0 0 30px rgba(56,189,248,0.8))',
                                'drop-shadow(0 0 10px rgba(56,189,248,0.4))',
                            ],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <h2>Formalize your vision.</h2>
                    <p>Apply for entry into India's most exclusive cofounder ecosystem.</p>
                    <motion.button
                        className="btn-primary-glow"
                        onClick={() => navigate('/create-profile')}
                        whileHover={{ scale: 1.04, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        APPLY FOR ACCESS <ArrowForwardIcon style={{ fontSize: 18 }} />
                    </motion.button>
                </motion.div>
            </section>

            {/* ════════════════════════════════════
                FOOTER
            ════════════════════════════════════ */}
            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <img src={FM_logo} alt="FM" className="footer-logo" />
                        <div>
                            <h3>Founder Matrimony</h3>
                            <p>Premium Strategic Matching Architecture</p>
                        </div>
                    </div>
                    <ul className="footer-links">
                        <li><a href="#how-it-works">Process</a></li>
                        <li><a href="#network">Network</a></li>
                        <li><a href="/filters">Explore</a></li>
                    </ul>
                    <div className="footer-meta">
                        <p>© 2025 Founder Matrimony • Built for India's 1% Builder Ecosystem.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;