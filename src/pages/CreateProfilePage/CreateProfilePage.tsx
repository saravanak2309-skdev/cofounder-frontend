import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SkillBadge from '../../components/SkillBadge/SkillBadge';
import './CreateProfilePage.css';

const industries = [
    'FinTech', 'EdTech', 'HealthTech', 'SaaS', 'E-Commerce',
    'AgriTech', 'CleanTech', 'D2C', 'Logistics', 'AI/ML',
    'PropTech', 'LegalTech', 'Gaming', 'Media', 'Other',
];

const CreateProfilePage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [skillInput, setSkillInput] = useState('');
    const [form, setForm] = useState({
        name: '', age: '', location: '',
        education: '', yearsOfExperience: '', industry: '', skills: [] as string[],
        commitment: 'Full-time', preferredCofounder: '', startupVision: '',
        bio: '', role: '',
    });

    const handleAddSkill = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            e.preventDefault();
            if (!form.skills.includes(skillInput.trim())) {
                setForm(f => ({ ...f, skills: [...f.skills, skillInput.trim()] }));
            }
            setSkillInput('');
        }
    };

    const removeSkill = (skill: string) => {
        setForm(f => ({ ...f, skills: f.skills.filter(s => s !== skill) }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const profile = { ...form, id: Date.now().toString() };
        localStorage.setItem('userProfile', JSON.stringify(profile));
        navigate('/swipe');
    };

    const stepTitles = ['Basic Details', 'Professional Background', 'Expectations', 'About You'];
    const totalSteps = 4;

    return (
        <div className="create-profile-page">
            <div className="create-profile-container">
                <div className="profile-header">
                    <h1 className="profile-title">Build Your Founder Profile</h1>
                    <p className="profile-subtitle">Help us find your perfect cofounder match</p>

                    {/* Progress */}
                    <div className="progress-bar-container">
                        <div className="progress-steps">
                            {stepTitles.map((title, i) => (
                                <div key={i} className={`progress-step ${i + 1 === step ? 'active' : ''} ${i + 1 < step ? 'done' : ''}`}>
                                    <div className="step-bubble">{i + 1 < step ? '✓' : i + 1}</div>
                                    <span className="step-name">{title}</span>
                                </div>
                            ))}
                        </div>
                        <div className="progress-bar">
                            <motion.div
                                className="progress-fill"
                                animate={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <motion.div
                        key={step}
                        className="form-card"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="form-step-title">{stepTitles[step - 1]}</h2>

                        {/* Step 1: Basic Details */}
                        {step === 1 && (
                            <div className="form-fields">
                                <div className="form-group">
                                    <label className="form-label">Full Name *</label>
                                    <input className="form-input" placeholder="Your full name" value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })} required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Age (optional)</label>
                                        <input className="form-input" type="number" min="18" max="99" placeholder="Your age"
                                            value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">I am a *</label>
                                        <select className="form-input" value={form.role}
                                            onChange={e => setForm({ ...form, role: e.target.value })} required>
                                            <option value="">Select role</option>
                                            <option>Tech</option><option>Business</option>
                                            <option>Design</option><option>Operations</option><option>Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Location *</label>
                                    <input className="form-input" placeholder="City, State / Country" value={form.location}
                                        onChange={e => setForm({ ...form, location: e.target.value })} required />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Professional Background */}
                        {step === 2 && (
                            <div className="form-fields">
                                <div className="form-group">
                                    <label className="form-label">Education *</label>
                                    <input className="form-input" placeholder="Institute – Degree, Field"
                                        value={form.education} onChange={e => setForm({ ...form, education: e.target.value })} required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Years of Experience *</label>
                                        <input className="form-input" type="number" min="0" max="50" placeholder="Years"
                                            value={form.yearsOfExperience} onChange={e => setForm({ ...form, yearsOfExperience: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Industry / Domain *</label>
                                        <select className="form-input" value={form.industry}
                                            onChange={e => setForm({ ...form, industry: e.target.value })} required>
                                            <option value="">Select industry</option>
                                            {industries.map(i => <option key={i}>{i}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Skills (press Enter to add)</label>
                                    <input
                                        className="form-input"
                                        placeholder="e.g. React, Python, Growth Hacking..."
                                        value={skillInput}
                                        onChange={e => setSkillInput(e.target.value)}
                                        onKeyDown={handleAddSkill}
                                    />
                                    {form.skills.length > 0 && (
                                        <div className="skills-tags">
                                            {form.skills.map(skill => (
                                                <SkillBadge key={skill} label={skill} variant="skill" onRemove={() => removeSkill(skill)} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Expectations */}
                        {step === 3 && (
                            <div className="form-fields">
                                <div className="form-group">
                                    <label className="form-label">Commitment *</label>
                                    <div className="toggle-group">
                                        {['Full-time', 'Part-time'].map(c => (
                                            <button
                                                key={c}
                                                type="button"
                                                className={`toggle-btn ${form.commitment === c ? 'active' : ''}`}
                                                onClick={() => setForm({ ...form, commitment: c })}
                                            >
                                                {c}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Preferred Cofounder Skillset *</label>
                                    <select className="form-input" value={form.preferredCofounder}
                                        onChange={e => setForm({ ...form, preferredCofounder: e.target.value })} required>
                                        <option value="">Select skillset</option>
                                        <option>Tech</option><option>Business</option>
                                        <option>Design</option><option>Operations</option><option>Domain Expert</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Startup Vision / Theme *</label>
                                    <textarea
                                        className="form-input form-textarea"
                                        rows={3}
                                        placeholder="What problem do you want to solve? What's your startup about?"
                                        value={form.startupVision}
                                        onChange={e => setForm({ ...form, startupVision: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 4: About You */}
                        {step === 4 && (
                            <div className="form-fields">
                                <div className="form-group">
                                    <label className="form-label">Short Bio *</label>
                                    <textarea
                                        className="form-input form-textarea"
                                        rows={5}
                                        placeholder="Tell potential cofounders about yourself, your background, and what you bring to the table..."
                                        value={form.bio}
                                        onChange={e => setForm({ ...form, bio: e.target.value })}
                                        required
                                    />
                                    <span className="char-count">{form.bio.length} / 500</span>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Profile Photo (optional)</label>
                                    <div className="photo-upload">
                                        <div className="photo-placeholder">
                                            <span className="photo-icon">📷</span>
                                            <span>Upload a photo</span>
                                            <span className="photo-hint">JPG, PNG up to 5MB</span>
                                        </div>
                                        <input type="file" accept="image/*" className="photo-input" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Navigation */}
                    <div className="form-nav">
                        {step > 1 && (
                            <button type="button" className="nav-btn back-btn" onClick={() => setStep(s => s - 1)}>
                                ← Back
                            </button>
                        )}
                        {step < totalSteps ? (
                            <motion.button
                                type="button"
                                className="nav-btn next-btn"
                                onClick={() => setStep(s => s + 1)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Next →
                            </motion.button>
                        ) : (
                            <motion.button
                                type="submit"
                                className="nav-btn submit-btn"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                🚀 Create Profile & Start Matching
                            </motion.button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProfilePage;
