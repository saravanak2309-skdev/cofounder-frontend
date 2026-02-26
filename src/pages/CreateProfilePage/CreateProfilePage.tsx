import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BadgeIcon from '@mui/icons-material/Badge';
import SchoolIcon from '@mui/icons-material/School';
import PsychologicalIcon from '@mui/icons-material/Psychology';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import './CreateProfilePage.css';

const steps = [
    { title: 'Identity', icon: <BadgeIcon />, desc: 'Define your founder persona and presence.' },
    { title: 'Expertise', icon: <SchoolIcon />, desc: 'Validate your professional credentials.' },
    { title: 'Alignment', icon: <BusinessCenterIcon />, desc: 'State your expectations and focus.' },
    { title: 'Vision', icon: <PsychologicalIcon />, desc: 'Pitch your breakthrough and core bio.' }
];

const CreateProfilePage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [skills, setSkills] = useState(['Solidity', 'Rust']);
    const [industries, setIndustries] = useState(['Web3', 'AI/ML']);
    const [newSkill, setNewSkill] = useState('');
    const [newIndustry, setNewIndustry] = useState('');
    const [photo, setPhoto] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
        else navigate('/swipe');
    };

    const addTag = (type: 'skill' | 'industry') => {
        if (type === 'skill' && newSkill.trim()) {
            if (!skills.includes(newSkill.trim())) setSkills([...skills, newSkill.trim()]);
            setNewSkill('');
        } else if (type === 'industry' && newIndustry.trim()) {
            if (!industries.includes(newIndustry.trim())) setIndustries([...industries, newIndustry.trim()]);
            setNewIndustry('');
        }
    };

    const removeTag = (tag: string, type: 'skill' | 'industry') => {
        if (type === 'skill') setSkills(skills.filter(s => s !== tag));
        else setIndustries(industries.filter(i => i !== tag));
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPhoto(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="onboarding-container">
            <div className="onboarding-card glass shadow-premium">
                {/* ── PROGRESS TRACKER ── */}
                <div className="onboarding-progress">
                    {steps.map((s, idx) => (
                        <div key={idx} className={`progress-segment ${idx <= currentStep ? 'active' : ''}`}>
                            <div className="segment-icon-wrap">
                                <span className="segment-icon">{s.icon}</span>
                                <span className="segment-indicator" />
                            </div>
                            <div className="segment-line" />
                        </div>
                    ))}
                </div>

                <div className="onboarding-content">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, scale: 0.98, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.98, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="step-content"
                        >
                            <div className="top-meta">
                                <span className="step-label">Module 0{currentStep + 1}</span>
                                <div className="step-badge">Verified Discovery</div>
                            </div>

                            <h1 className="step-title">{steps[currentStep].title}</h1>
                            <p className="step-desc">{steps[currentStep].desc}</p>

                            <div className="form-stack">
                                {currentStep === 0 && (
                                    <>
                                        <div className="photo-upload-section">
                                            <div
                                                className="photo-preview-circle"
                                                onClick={() => fileInputRef.current?.click()}
                                                style={{ backgroundImage: photo ? `url(${photo})` : 'none' }}
                                            >
                                                {!photo && <AddAPhotoIcon fontSize="large" />}
                                            </div>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                style={{ display: 'none' }}
                                                onChange={handlePhotoUpload}
                                                accept="image/*"
                                            />
                                            <p className="upload-hint">Upload Founder Presence (Optional)</p>
                                        </div>
                                        <div className="input-row">
                                            <div className="input-group">
                                                <label>Founder Name</label>
                                                <input type="text" placeholder="e.g. Kabir Dev" />
                                            </div>
                                            <div className="input-group">
                                                <label>Professional Role</label>
                                                <select>
                                                    <option>Tech Founder (CTO)</option>
                                                    <option>Business Founder (CEO)</option>
                                                    <option>Design Founder (CPO)</option>
                                                    <option>Operations Founder (COO)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="input-group">
                                            <label>Current Base / Location</label>
                                            <input type="text" placeholder="e.g. Bangalore, IN" />
                                        </div>
                                    </>
                                )}

                                {currentStep === 1 && (
                                    <>
                                        <div className="input-group">
                                            <label>Academic / Professional Institution</label>
                                            <input type="text" placeholder="e.g. IIT Madras / Ex-Google" />
                                        </div>
                                        <div className="input-group">
                                            <label>Years of Executive Tenure</label>
                                            <input type="number" placeholder="e.g. 8" />
                                        </div>
                                        <div className="input-group">
                                            <label>Core Expertise Markers</label>
                                            <div className="tag-input-container">
                                                <div className="tag-list">
                                                    {skills.map(skill => (
                                                        <span key={skill} className="tag-pill">
                                                            {skill} <CloseIcon onClick={() => removeTag(skill, 'skill')} fontSize="inherit" />
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="tag-input-box">
                                                    <input
                                                        type="text"
                                                        placeholder="Add skill..."
                                                        value={newSkill}
                                                        onChange={(e) => setNewSkill(e.target.value)}
                                                        onKeyDown={(e) => e.key === 'Enter' && addTag('skill')}
                                                    />
                                                    <button onClick={() => addTag('skill')}>Add</button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {currentStep === 2 && (
                                    <>
                                        <div className="input-row">
                                            <div className="input-group">
                                                <label>Commitment Preference</label>
                                                <select>
                                                    <option>Full-time (Venture Focus)</option>
                                                    <option>Part-time (Strategic Advisor)</option>
                                                </select>
                                            </div>
                                            <div className="input-group">
                                                <label>Discovery Goal</label>
                                                <select>
                                                    <option>Looking for Tech Partner</option>
                                                    <option>Looking for Business Partner</option>
                                                    <option>Looking for Investment</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="input-group">
                                            <label>Target Industries & Domains</label>
                                            <div className="tag-input-container">
                                                <div className="tag-list">
                                                    {industries.map(ind => (
                                                        <span key={ind} className="tag-pill">
                                                            {ind} <CloseIcon onClick={() => removeTag(ind, 'industry')} fontSize="inherit" />
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="tag-input-box">
                                                    <input
                                                        type="text"
                                                        placeholder="Add domain..."
                                                        value={newIndustry}
                                                        onChange={(e) => setNewIndustry(e.target.value)}
                                                        onKeyDown={(e) => e.key === 'Enter' && addTag('industry')}
                                                    />
                                                    <button onClick={() => addTag('industry')}>Add</button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {currentStep === 3 && (
                                    <>
                                        <div className="input-group">
                                            <label>The Venture Vision (Pitch)</label>
                                            <textarea
                                                rows={4}
                                                placeholder="What massive problem are you solving? Describe your breakthrough vision."
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label>Short Executive Bio</label>
                                            <textarea
                                                rows={3}
                                                placeholder="A concise summary of your professional journey and founder persona."
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="onboarding-footer">
                    <button
                        className="btn-onboarding-back"
                        disabled={currentStep === 0}
                        onClick={() => setCurrentStep(currentStep - 1)}
                    >
                        <ArrowBackIcon fontSize="small" /> PREVIOUS
                    </button>
                    <button className="btn-premium btn-premium-primary" onClick={handleNext}>
                        {currentStep === steps.length - 1 ? 'INITIATE DISCOVERY' : 'CONTINUE PROTOCOL'}
                        <ArrowForwardIcon fontSize="small" />
                    </button>
                </div>

                <div className="onboarding-trust-footer">
                    <VerifiedUserIcon fontSize="inherit" />
                    <span>Founder Matrimony secures your data through strategic encryption protocols.</span>
                </div>
            </div>
        </div>
    );
};

export default CreateProfilePage;
