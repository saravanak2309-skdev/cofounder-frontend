import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import FactoryIcon from '@mui/icons-material/Factory';
import BoltIcon from '@mui/icons-material/Bolt';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CreateIcon from '@mui/icons-material/Create';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { mockFounders } from '../../data/mockFounders';
import './LandingPage.css';
import SwipeHeroCard from '../../components/SwipeHeroCard/SwipeHeroCard';
import FM_logo from '../../assets/FM_logo.png';

const industries = [
    'FinTech', 'EdTech', 'HealthTech', 'SaaS', 'E-Commerce',
    'AgriTech', 'CleanTech', 'D2C', 'Logistics', 'AI/ML',
    'PropTech', 'LegalTech', 'Gaming', 'Media', 'Other',
];

const criteriaItems = [
    { icon: <LocationOnIcon fontSize="inherit" />, label: 'Location' },
    { icon: <SchoolIcon fontSize="inherit" />, label: 'Education' },
    { icon: <AccessTimeIcon fontSize="inherit" />, label: 'Experience' },
    { icon: <TrackChangesIcon fontSize="inherit" />, label: 'Expectations' },
    { icon: <FactoryIcon fontSize="inherit" />, label: 'Domain Expertise' },
    { icon: <BoltIcon fontSize="inherit" />, label: 'Skills' },
    { icon: <PsychologyIcon fontSize="inherit" />, label: 'Founder Mindset' },
];

const steps = [
    { step: '01', icon: <CreateIcon fontSize="inherit" />, title: 'Create Profile', desc: 'Build your founder profile highlighting your skills, vision, and what you bring to the table.' },
    { step: '02', icon: <LocalFireDepartmentIcon fontSize="inherit" />, title: 'Swipe & Match', desc: "Discover potential cofounders. Swipe right to connect, left to pass. It's that simple." },
    { step: '03', icon: <RocketLaunchIcon fontSize="inherit" />, title: 'Connect & Build', desc: 'Chat, schedule a call, and start building your dream startup together.' },
];

const LandingPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        contact: '',
        role: '',
        lookingFor: '',
        industry: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Simulate a premium transition
        setTimeout(() => navigate('/swipe'), 1500);
    };

    return (
        <div className="landing">
            {/* ── Hero Section ────────────────────────────────────────────────── */}
            <section className="hero-section">
                <div className="hero-glow hero-glow-1" />
                <div className="hero-glow hero-glow-2" />

                <div className="hero-inner">
                    <motion.div
                        className="hero-left"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <div className="hero-badge">
                            <BoltIcon fontSize="small" className="hero-badge-icon" />
                            <span>The Premium Network for Builders</span>
                        </div>

                        <h1 className="hero-title">
                            Build the Future with your <br />
                            <span className="hero-title-gradient">Strategic Partner</span>
                        </h1>

                        <p className="hero-subtitle">
                            Match with elite cofounders based on shared vision,
                            complementary skills, and verified domain expertise.
                            The professional alternative to casual networking.
                        </p>

                        <div className="hero-stats">
                            <div className="hero-stat">
                                <span className="hero-stat-num">12k+</span>
                                <span className="hero-stat-label">Founders</span>
                            </div>
                            <div className="hero-stat-divider" />
                            <div className="hero-stat">
                                <span className="hero-stat-num">450+</span>
                                <span className="hero-stat-label">MVPs Built</span>
                            </div>
                            <div className="hero-stat-divider" />
                            <div className="hero-stat">
                                <span className="hero-stat-num">32</span>
                                <span className="hero-stat-label">Exits</span>
                            </div>
                        </div>

                        <div className="hero-cta-group">
                            <button
                                onClick={() => document.getElementById('signup-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="btn-primary"
                            >
                                Get Started <RocketLaunchIcon fontSize="small" />
                            </button>
                            <button className="btn-secondary">
                                View Success Stories
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        className="hero-right"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        {/* Interactive Swipe Preview */}
                        <div className="swipe-hero-container">
                            <SwipeHeroCard />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Criteria Strip ──────────────────────────────────────────────── */}
            <section className="criteria-section">
                <div className="criteria-container">
                    <p className="criteria-label">Engineered for deep alignment</p>
                    <div className="criteria-marquee-wrapper">
                        <motion.div
                            className="criteria-marquee-content"
                            animate={{ x: [0, -1000] }}
                            transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                        >
                            {[...criteriaItems, ...criteriaItems, ...criteriaItems].map((item, idx) => (
                                <div key={idx} className="criteria-item">
                                    <span className="criteria-icon">{item.icon}</span>
                                    {item.label}
                                </div>
                            ))}
                        </motion.div>
                        <div className="marquee-fade marquee-fade-left" />
                        <div className="marquee-fade marquee-fade-right" />
                    </div>
                </div>
            </section>

            {/* ── Signup Section ─────────────────────────────────────────────── */}
            <section className="signup-section" id="signup-section">
                <div className="signup-container">
                    <div className="signup-mesh" />
                    <div className="signup-header">
                        <h2 className="section-title">Join the Ecosystem</h2>
                        <p className="section-subtitle">Connect with India's most ambitious founders today.</p>
                    </div>

                    {submitted ? (
                        <motion.div
                            className="success-overlay"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        >
                            <div className="success-card">
                                <CelebrationIcon className="success-icon" />
                                <h3>Welcome to Founder Matrimony</h3>
                                <p>Onboarding you to the network...</p>
                            </div>
                        </motion.div>
                    ) : (
                        <form className="premium-form" onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Saravana K"
                                        required
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email or Phone</label>
                                    <input
                                        type="text"
                                        placeholder="Better for auth"
                                        required
                                        onChange={e => setForm({ ...form, contact: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Your Role</label>
                                    <select required onChange={e => setForm({ ...form, role: e.target.value })}>
                                        <option value="">Select role</option>
                                        <option>Tech Founder (CTO)</option>
                                        <option>Business Founder (CEO)</option>
                                        <option>Design Founder (CPO)</option>
                                        <option>Growth & Ops Founder</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Looking For</label>
                                    <select required onChange={e => setForm({ ...form, lookingFor: e.target.value })}>
                                        <option value="">Desired partner</option>
                                        <option>Tech Partner</option>
                                        <option>Business Partner</option>
                                        <option>Product Partner</option>
                                        <option>Strategic Advisor</option>
                                    </select>
                                </div>
                                <div className="form-group full-width">
                                    <label>Industry Interest</label>
                                    <select required onChange={e => setForm({ ...form, industry: e.target.value })}>
                                        <option value="">Choose your space</option>
                                        {industries.map(i => <option key={i}>{i}</option>)}
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="form-submit-btn">
                                Access the Network <ArrowForwardIcon style={{ fontSize: '1.2rem' }} />
                            </button>
                        </form>
                    )}
                </div>
            </section>

            {/* ── How It Works ────────────────────────────────────────────────── */}
            <section className="how-it-works">
                <div className="hiw-container">
                    <div className="section-intro">
                        <h2 className="section-title">The Path to Partnership</h2>
                        <p className="section-subtitle">A data-driven approach to cofounder matching.</p>
                    </div>

                    <div className="steps-row">
                        {steps.map((s, i) => (
                            <motion.div
                                className="hiw-step"
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="step-icon-wrap">
                                    {s.icon}
                                    <span className="step-num">{s.step}</span>
                                </div>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Founder Spotlight ───────────────────────────────────────────── */}
            <section className="founder-spotlight">
                <div className="spotlight-header">
                    <h2 className="section-title">Discovery Pool</h2>
                    <p className="section-subtitle">Top talent actively looking for cofounders.</p>
                </div>
                {/* Horizontal Carousel Preview */}
                <div className="horizontal-preview">
                    <div className="preview-track">
                        {mockFounders.map(f => (
                            <div className="preview-card-mini" key={f.id}>
                                <div className="card-top">
                                    <div className="card-avatar">{f.name[0]}</div>
                                    <div className="card-meta">
                                        <span className="card-name">{f.name}</span>
                                        <span className="card-role">{f.role}</span>
                                    </div>
                                </div>
                                <p className="card-one-liner">{f.bio.split('.')[0]}.</p>
                                <div className="card-tags">
                                    {f.industries.slice(0, 2).map(i => <span key={i} className="mini-tag">{i}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Footer ──────────────────────────────────────────────────────── */}
            <footer className="footer-v2">
                <div className="footer-v2-container">
                    <div className="footer-brand">
                        <img src={FM_logo} alt="FM" className="footer-logo-main" />
                        <div className="brand-text">
                            <h3>Founder Matrimony</h3>
                            <p>Premium Strategic Matching</p>
                        </div>
                    </div>
                    <div className="footer-links-grid">
                        <div className="link-col">
                            <h4>Platform</h4>
                            <a href="#">Network</a>
                            <a href="#">Success Stories</a>
                            <a href="#">Events</a>
                        </div>
                        <div className="link-col">
                            <h4>Legal</h4>
                            <a href="#">Privacy</a>
                            <a href="#">Terms</a>
                            <a href="#">Ethics</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2025 Founder Matrimony. High-fidelity strategic connections.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;