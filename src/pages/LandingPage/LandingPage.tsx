import { useState, useEffect } from 'react';
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
import FM_logo3 from '../../assets/FM_logo3.png';
import FounderCard from '../../components/FounderCard/FounderCard';
import { mockFounders } from '../../data/mockFounders';
import './LandingPage.css';

const criteriaItems = [
    { icon: <LocationOnIcon />, label: 'Location' },
    { icon: <SchoolIcon />, label: 'Alma Mater' },
    { icon: <AccessTimeIcon />, label: 'Tenure' },
    { icon: <PsychologyIcon />, label: 'Mindset' },
    { icon: <BusinessCenterIcon />, label: 'Domain' },
    { icon: <BoltIcon />, label: 'Skills' },
];

const steps = [
    {
        icon: <TravelExploreIcon />,
        title: "Protocol Setup",
        desc: "Define your founder DNA, expertise gaps, and startup vision through our verified framework."
    },
    {
        icon: <GroupIcon />,
        title: "Strategic Discovery",
        desc: "Screen elite cofounders using high-precision filters and multi-dimensional compatibility scores."
    },
    {
        icon: <RocketLaunchIcon />,
        title: "Launch Alliance",
        desc: "Formalize partnerships with pre-vetted legal support to start building at venture speed."
    }
];

const LandingPage = () => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);

    // Vertical Carousel Simulator for Hero Profiles
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % mockFounders.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="landing-page">
            <div className="bg-glow bg-glow-1" />
            <div className="bg-glow bg-glow-2" />

            {/* ── 3-COLUMN PREMIUM HERO ── */}
            <section className="hero-section">
                <div className="hero-grid-3col">
                    {/* Column 1: Narrative */}
                    <div className="hero-col hero-col-left">
                        <motion.div
                            className="hero-badge"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <VerifiedIcon fontSize="small" /> Elite Discovery Ecosystem
                        </motion.div>
                        <motion.h1
                            className="hero-title title-massive"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            Build your founding team. <br />
                            <span className="text-gradient">With precision.</span>
                        </motion.h1>
                        <motion.p
                            className="hero-subtitle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Founder Matrimony is the high-trust alternative to casual discovery.
                            Find partners verified by domain, tenure, and strategic vision.
                        </motion.p>
                        <button className="btn-premium btn-premium-secondary" onClick={() => navigate('/filters')}>
                            Explore Current Pool
                        </button>
                    </div>

                    {/* Column 2: Brand Anchor */}
                    <div className="hero-col hero-col-center">
                        <motion.div
                            className="hero-brand-anchor"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <img src={FM_logo3} alt="Logo" className="hero-monogram animate-pulse-slight" />
                            <div className="hero-monogram-glow" />
                        </motion.div>
                    </div>

                    {/* Column 3: Profile Carousel (Replaced Swiping) */}
                    <div className="hero-col hero-col-right">
                        <div className="hero-trial-label">Verified Builder Network</div>
                        <div className="hero-profile-carousel-container">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    className="hero-carousel-slot"
                                    initial={{ opacity: 0, y: 20, rotate: 2 }}
                                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                                    exit={{ opacity: 0, y: -20, rotate: -2 }}
                                    transition={{ duration: 0.6, ease: "circOut" }}
                                >
                                    <FounderCard founder={mockFounders[activeIndex]} isTop={false} />
                                </motion.div>
                            </AnimatePresence>

                            <div className="carousel-indicators">
                                {mockFounders.slice(0, 5).map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`indicator-dot ${activeIndex === idx ? 'active' : ''}`}
                                        onClick={() => setActiveIndex(idx)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── INLINE SIGNUP FORM (PREMIUM BAR) ── */}
                <motion.div
                    className="inline-signup-bar glass shadow-premium"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
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
                                <option>Ops/Other</option>
                            </select>
                        </div>
                        <div className="bar-divider" />
                        <div className="bar-field field-expand">
                            <label>Venture Needs</label>
                            <input type="text" placeholder="e.g. Fintech Tech Partner" />
                        </div>
                        <button className="btn-bar-action" onClick={() => navigate('/create-profile')}>
                            INITIATE PROTOCOL <ArrowForwardIcon />
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* ── CRITERIA HIGHLIGHT STRIP ── */}
            <section className="criteria-strip">
                <div className="strip-container">
                    <motion.div
                        className="strip-content"
                        animate={{ x: [0, -1200] }}
                        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
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

            {/* ── HOW IT WORKS ── */}
            <section className="how-it-works">
                <div className="section-header">
                    <h2 className="text-gradient">Venture Alignment Framework</h2>
                    <p>India's most systematic approach to founding team development.</p>
                </div>
                <div className="steps-grid">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            className="step-card glass"
                            whileHover={{ y: -10 }}
                        >
                            <div className="step-icon-wrap">{step.icon}</div>
                            <div className="step-number">0{idx + 1}</div>
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── FOUNDER CAROUSEL (SILKY SMOOTH LOOP) ── */}
            <section className="founder-carousel">
                <div className="section-header">
                    <h2 className="text-gradient">Elite Network Reach</h2>
                    <p>Direct access to verified builders from the world's leading ecosystems.</p>
                </div>
                <div className="carousel-track-wrapper">
                    <div className="carousel-track animate-scroll">
                        {[...mockFounders, ...mockFounders, ...mockFounders].map((f, idx) => (
                            <div key={idx} className="carousel-card-wrap">
                                <FounderCard founder={f} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ── */}
            <section className="cta-section">
                <div className="cta-card glass">
                    <img src={FM_logo3} alt="Logo" className="cta-logo" />
                    <h2>Formalize your vision.</h2>
                    <p>Apply for entry into India's most exclusive cofounder ecosystem.</p>
                    <button className="btn-premium btn-premium-primary" onClick={() => navigate('/create-profile')}>
                        APPLY FOR ACCESS <ArrowForwardIcon />
                    </button>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="landing-footer glass">
                <div className="footer-content">
                    <div className="footer-brand">
                        <img src={FM_logo3} alt="FM" className="footer-logo" />
                        <div>
                            <h3>Founder Matrimony</h3>
                            <p>Premium Strategic Matching Architecture</p>
                        </div>
                    </div>
                    <div className="footer-meta">
                        <p>© 2025 Founder Matrimony • Built for India's 1% Builder Ecosystem.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
