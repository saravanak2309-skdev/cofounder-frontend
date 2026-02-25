import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FounderCard from '../../components/FounderCard/FounderCard';
import { mockFounders } from '../../data/mockFounders';
import './LandingPage.css';

const industries = [
    'FinTech', 'EdTech', 'HealthTech', 'SaaS', 'E-Commerce',
    'AgriTech', 'CleanTech', 'D2C', 'Logistics', 'AI/ML',
    'PropTech', 'LegalTech', 'Gaming', 'Media', 'Other',
];

const criteriaItems = [
    { icon: '📍', label: 'Location' },
    { icon: '🎓', label: 'Education' },
    { icon: '⏱️', label: 'Experience' },
    { icon: '🎯', label: 'Expectations' },
    { icon: '🏭', label: 'Domain Expertise' },
    { icon: '⚡', label: 'Skills' },
    { icon: '🧠', label: 'Founder Mindset' },
];

const steps = [
    { step: '01', icon: '✍️', title: 'Create Profile', desc: 'Build your founder profile highlighting your skills, vision, and what you bring to the table.' },
    { step: '02', icon: '🔥', title: 'Swipe & Match', desc: 'Discover potential cofounders. Swipe right to connect, left to pass. It\'s that simple.' },
    { step: '03', icon: '🚀', title: 'Connect & Build', desc: 'Chat, schedule a call, and start building your dream startup together.' },
];

const LandingPage = () => {
    const navigate = useNavigate();
    const [activeCard, setActiveCard] = useState(0);
    const [form, setForm] = useState({
        name: '', email: '', role: '', lookingFor: '', industry: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const previewFounders = mockFounders.slice(0, 3);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => navigate('/create-profile'), 1500);
    };

    return (
        <div className="landing">
            {/* Hero */}
            <section className="hero">
                <div className="hero-content">
                    <motion.div
                        className="hero-badge"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        🔥 The Startup Tinder for Founders
                    </motion.div>

                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Find Your
                        <span className="gradient-text"> Perfect Cofoundersssss</span>
                    </motion.h1>

                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Stop building alone. Match with the cofounder who complements your skills,
                        shares your vision, and is as obsessed as you are.
                    </motion.p>

                    <motion.div
                        className="hero-stats"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="stat-item">
                            <span className="stat-num">2,400+</span>
                            <span className="stat-label">Founders</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-num">180+</span>
                            <span className="stat-label">Startups</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-num">$12M+</span>
                            <span className="stat-label">Raised</span>
                        </div>
                    </motion.div>
                </div>

                {/* Card Preview */}
                <motion.div
                    className="hero-card-preview"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="card-stack">
                        <AnimatePresence mode="wait">
                            {previewFounders.map((founder, i) => (
                                i === activeCard && (
                                    <motion.div
                                        key={founder.id}
                                        className="preview-card-wrapper"
                                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <FounderCard founder={founder} isTop={false} />
                                    </motion.div>
                                )
                            ))}
                        </AnimatePresence>
                    </div>
                    <div className="card-indicators">
                        {previewFounders.map((_, i) => (
                            <button
                                key={i}
                                className={`indicator-dot ${i === activeCard ? 'active' : ''}`}
                                onClick={() => setActiveCard(i)}
                            />
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Criteria Strip */}
            <section className="criteria-section">
                <p className="criteria-label">Matched on 7 key dimensions</p>
                <div className="criteria-strip">
                    {criteriaItems.map((item) => (
                        <div key={item.label} className="criteria-item">
                            <span className="criteria-icon">{item.icon}</span>
                            <span className="criteria-text">{item.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Signup Form */}
            <section className="signup-section" id="signup">
                <div className="signup-container">
                    <div className="signup-header">
                        <h2 className="section-title">Join the Founding Community</h2>
                        <p className="section-subtitle">Create your profile in under 2 minutes</p>
                    </div>

                    {submitted ? (
                        <motion.div
                            className="success-msg"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <span className="success-icon">🎉</span>
                            <h3>Welcome aboard, {form.name}!</h3>
                            <p>Taking you to profile setup...</p>
                        </motion.div>
                    ) : (
                        <form className="signup-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Full Name *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Your full name"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email / Phone *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Email or mobile number"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">I am a *</label>
                                    <select
                                        className="form-input"
                                        value={form.role}
                                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                                        required
                                    >
                                        <option value="">Select your role</option>
                                        <option>Tech</option>
                                        <option>Business</option>
                                        <option>Design</option>
                                        <option>Operations</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Looking For *</label>
                                    <select
                                        className="form-input"
                                        value={form.lookingFor}
                                        onChange={(e) => setForm({ ...form, lookingFor: e.target.value })}
                                        required
                                    >
                                        <option value="">What skillset?</option>
                                        <option>Tech</option>
                                        <option>Business</option>
                                        <option>Design</option>
                                        <option>Domain Expert</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Primary Industry Interest *</label>
                                <select
                                    className="form-input"
                                    value={form.industry}
                                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                                    required
                                >
                                    <option value="">Select industry</option>
                                    {industries.map((ind) => (
                                        <option key={ind}>{ind}</option>
                                    ))}
                                </select>
                            </div>
                            <motion.button
                                type="submit"
                                className="submit-btn"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Start Matching →
                            </motion.button>
                            <p className="form-note">By signing up, you agree to our Terms of Service. Free forever.</p>
                        </form>
                    )}
                </div>
            </section>

            {/* How It Works */}
            <section className="how-it-works">
                <h2 className="section-title">How It Works</h2>
                <p className="section-subtitle">Three steps to finding your startup soulmate</p>
                <div className="steps-grid">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.step}
                            className="step-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                        >
                            <div className="step-number">{step.step}</div>
                            <div className="step-icon">{step.icon}</div>
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-desc">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-brand">
                        <span className="footer-logo">💼 Founder's Matrimony</span>
                        <p className="footer-tagline">Where startups are born.</p>
                    </div>
                    <nav className="footer-links">
                        <a href="#" className="footer-link">About</a>
                        <a href="#" className="footer-link">Contact</a>
                        <a href="#" className="footer-link">Terms</a>
                        <a href="#" className="footer-link">Privacy</a>
                    </nav>
                </div>
                <p className="footer-copy">© 2024 Founder's Matrimony. Built by founders, for founders.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
