import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import PsychologyIcon from '@mui/icons-material/Psychology';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './CreateProfilePage.css';

const industries = [
    'FinTech', 'EdTech', 'HealthTech', 'SaaS', 'E-Commerce',
    'AgriTech', 'CleanTech', 'D2C', 'Logistics', 'AI/ML',
    'PropTech', 'LegalTech', 'Gaming', 'Media', 'Other',
];

const roles = [
    { id: 'tech', label: 'Tech Founder', desc: 'Engineering & Product', icon: <PsychologyIcon /> },
    { id: 'business', label: 'Business Founder', desc: 'Strategy & Growth', icon: <WorkIcon /> },
    { id: 'design', label: 'Design Founder', desc: 'UX & Creative', icon: <VisibilityIcon /> },
    { id: 'ops', label: 'Ops Founder', desc: 'Execution & People', icon: <PersonIcon /> },
];

const CreateProfilePage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [skillInput, setSkillInput] = useState('');
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState({
        name: '', age: '', location: '',
        education: '', yearsOfExperience: '', industry: '', skills: [] as string[],
        commitment: 'Full-time', preferredCofounder: '', startupVision: '',
        bio: '', roleId: '',
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

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const profile = { ...form, id: Date.now().toString(), photoUrl: photoPreview };
        localStorage.setItem('userProfile', JSON.stringify(profile));
        navigate('/swipe');
    };

    const stepTitles = ['Identity', 'Expertise', 'Vision', 'Presence'];
    const totalSteps = 4;

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <div className="cp-page">
            <div className="cp-glow cp-glow-1" />
            <div className="cp-glow cp-glow-2" />

            <div className="cp-container">
                <header className="cp-header">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="cp-badge"
                    >
                        Step {step} of {totalSteps}
                    </motion.div>
                    <h1 className="cp-title">{stepTitles[step - 1]}</h1>
                    <p className="cp-subtitle">Crafting your professional founder persona</p>

                    {/* Stepper */}
                    <div className="cp-stepper">
                        {stepTitles.map((_, i) => (
                            <div key={i} className={`cp-step-indicator ${i + 1 <= step ? 'active' : ''}`}>
                                <div className="cp-step-dot" />
                                {i < stepTitles.length - 1 && <div className="cp-step-line" />}
                            </div>
                        ))}
                    </div>
                </header>

                <form className="cp-form-wrapper" onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                            className="cp-card"
                        >
                            {/* Step 1: Basic Details & Role */}
                            {step === 1 && (
                                <div className="cp-section">
                                    <div className="cp-input-group">
                                        <label>What's your full name?</label>
                                        <input
                                            type="text"
                                            placeholder="Elon Tusk"
                                            value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="cp-role-grid">
                                        {roles.map(r => (
                                            <div
                                                key={r.id}
                                                className={`cp-role-card ${form.roleId === r.id ? 'active' : ''}`}
                                                onClick={() => setForm({ ...form, roleId: r.id })}
                                            >
                                                <div className="cp-role-icon">{r.icon}</div>
                                                <div className="cp-role-info">
                                                    <h4>{r.label}</h4>
                                                    <p>{r.desc}</p>
                                                </div>
                                                {form.roleId === r.id && <CheckCircleIcon className="cp-check" />}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="cp-input-row">
                                        <div className="cp-input-group">
                                            <label>Age</label>
                                            <input
                                                type="number"
                                                placeholder="28"
                                                value={form.age}
                                                onChange={e => setForm({ ...form, age: e.target.value })}
                                            />
                                        </div>
                                        <div className="cp-input-group">
                                            <label>Location</label>
                                            <input
                                                type="text"
                                                placeholder="Bangalore, IN"
                                                value={form.location}
                                                onChange={e => setForm({ ...form, location: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Background */}
                            {step === 2 && (
                                <div className="cp-section">
                                    <div className="cp-input-group">
                                        <label>Education & Background</label>
                                        <input
                                            type="text"
                                            placeholder="Stanford MBA / Self-taught Developer"
                                            value={form.education}
                                            onChange={e => setForm({ ...form, education: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="cp-input-row">
                                        <div className="cp-input-group">
                                            <label>Exp (Years)</label>
                                            <input
                                                type="number"
                                                placeholder="5"
                                                value={form.yearsOfExperience}
                                                onChange={e => setForm({ ...form, yearsOfExperience: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="cp-input-group">
                                            <label>Primary Industry</label>
                                            <select
                                                value={form.industry}
                                                onChange={e => setForm({ ...form, industry: e.target.value })}
                                                required
                                            >
                                                <option value="">Select Domain</option>
                                                {industries.map(i => <option key={i} value={i}>{i}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="cp-input-group">
                                        <label>Top Skills (Enter to add)</label>
                                        <div className="cp-tag-input-wrap">
                                            <input
                                                type="text"
                                                placeholder="AI, GTM, React..."
                                                value={skillInput}
                                                onChange={e => setSkillInput(e.target.value)}
                                                onKeyDown={handleAddSkill}
                                            />
                                            <div className="cp-tags">
                                                {form.skills.map(s => (
                                                    <span key={s} className="cp-tag">
                                                        {s} <CloseIcon onClick={() => removeSkill(s)} className="cp-tag-close" />
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Vision */}
                            {step === 3 && (
                                <div className="cp-section">
                                    <div className="cp-input-group">
                                        <label>What's the vision?</label>
                                        <textarea
                                            placeholder="Briefly describe the world you want to build or the problem you are obsessed with..."
                                            value={form.startupVision}
                                            onChange={e => setForm({ ...form, startupVision: e.target.value })}
                                            rows={4}
                                            required
                                        />
                                    </div>
                                    <div className="cp-input-group">
                                        <label>Who are you looking for?</label>
                                        <select
                                            value={form.preferredCofounder}
                                            onChange={e => setForm({ ...form, preferredCofounder: e.target.value })}
                                            required
                                        >
                                            <option value="">Select partner core skill</option>
                                            <option>Technology (CTO)</option>
                                            <option>Business (CEO)</option>
                                            <option>Product & Design (CPO)</option>
                                            <option>Growth & Market</option>
                                        </select>
                                    </div>
                                    <div className="cp-commitment-wrap">
                                        <label>Commitment Level</label>
                                        <div className="cp-toggle-group">
                                            {['Full-time', 'Part-time'].map(c => (
                                                <button
                                                    key={c}
                                                    type="button"
                                                    className={form.commitment === c ? 'active' : ''}
                                                    onClick={() => setForm({ ...form, commitment: c })}
                                                >
                                                    {c}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Persona */}
                            {step === 4 && (
                                <div className="cp-section">
                                    <div className="cp-photo-section">
                                        <div
                                            className="cp-photo-upload"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            {photoPreview ? (
                                                <img src={photoPreview} alt="Preview" className="cp-preview-img" />
                                            ) : (
                                                <div className="cp-upload-placeholder">
                                                    <CloudUploadIcon />
                                                    <span>Add Profile Photo</span>
                                                </div>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handlePhotoChange}
                                            style={{ display: 'none' }}
                                            accept="image/*"
                                        />
                                    </div>

                                    <div className="cp-input-group">
                                        <label>The Founder's Bio</label>
                                        <textarea
                                            placeholder="Talk about your journey, your wins, and your quirks..."
                                            value={form.bio}
                                            onChange={e => setForm({ ...form, bio: e.target.value })}
                                            rows={6}
                                            required
                                        />
                                        <div className="cp-char-count">{form.bio.length}/500</div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    <footer className="cp-footer">
                        {step > 1 && (
                            <button type="button" className="btn-ghost" onClick={prevStep}>
                                <ArrowBackIcon fontSize="small" /> Back
                            </button>
                        )}
                        <div style={{ marginLeft: 'auto' }}>
                            {step < totalSteps ? (
                                <button type="button" className="btn-primary" onClick={nextStep}>
                                    Next Step <ArrowForwardIcon fontSize="small" />
                                </button>
                            ) : (
                                <button type="submit" className="btn-primary btn-submit">
                                    Launch Profile <RocketLaunchIcon fontSize="small" />
                                </button>
                            )}
                        </div>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default CreateProfilePage;
