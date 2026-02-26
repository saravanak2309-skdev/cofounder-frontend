import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BoltIcon from '@mui/icons-material/Bolt';
import WorkIcon from '@mui/icons-material/Work';
import VerifiedIcon from '@mui/icons-material/Verified';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';
import PsychologyIcon from '@mui/icons-material/Psychology';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SecurityIcon from '@mui/icons-material/Security';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import EditIcon from '@mui/icons-material/Edit';
import FM_logo3 from '../../assets/FM_logo3.png';
import { mockCurrentUser } from '../../data/mockFounders';
import './ProfilePage.css';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('identity');
    const [isStealthMode, setIsStealthMode] = useState(false);

    const tabs = [
        { id: 'identity', label: 'Identity', icon: <PersonIcon /> },
        { id: 'expertise', label: 'Expertise', icon: <BoltIcon /> },
        { id: 'alignment', label: 'Expectations', icon: <PsychologyIcon /> },
        { id: 'preferences', label: 'Preferences', icon: <SettingsIcon /> },
        { id: 'analytics', label: 'Performance', icon: <AnalyticsIcon /> }
    ];

    return (
        <div className="premium-profile-page">
            <div className="dashboard-layout">

                {/* ── LEFT NAVIGATION RAIL ── */}
                <aside className="dashboard-rail glass">
                    <div className="rail-brand">
                        <img src={FM_logo3} alt="FM" className="rail-logo" />
                    </div>

                    <nav className="rail-nav">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`rail-item ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                                title={tab.label}
                            >
                                {tab.icon}
                                <span className="rail-label">{tab.label}</span>
                            </button>
                        ))}
                    </nav>

                    <button className="rail-item logout">
                        <LogoutIcon />
                        <span className="rail-label">Sign Out</span>
                    </button>
                </aside>

                {/* ── CENTRAL CONTENT HUB ── */}
                <main className="dashboard-main">
                    <header className="main-header">
                        <div className="header-breadcrumbs">
                            <span>Dashboard</span>
                            <span className="chevron">/</span>
                            <span className="active-path">{tabs.find(t => t.id === activeTab)?.label}</span>
                        </div>

                        <div className="discovery-toggle-kit glass">
                            <SecurityIcon fontSize="small" className={isStealthMode ? 'stealth-active' : ''} />
                            <div className="toggle-text">
                                <span className="toggle-label">Stealth Protocol</span>
                                <span className="toggle-status">{isStealthMode ? 'ACTIVE' : 'INACTIVE'}</span>
                            </div>
                            <div
                                className={`dash-toggle ${isStealthMode ? 'on' : ''}`}
                                onClick={() => setIsStealthMode(!isStealthMode)}
                            >
                                <div className="dash-toggle-knob" />
                            </div>
                        </div>
                    </header>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            className="tab-view-container"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* ── IDENTITY VIEW ── */}
                            {activeTab === 'identity' && (
                                <div className="identity-hub">
                                    <div className="profile-identity-card glass">
                                        <div className="identity-avatar-section">
                                            <div className="mega-identity-avatar">
                                                {mockCurrentUser.name[0]}
                                                <button className="edit-avatar-btn"><EditIcon fontSize="small" /></button>
                                            </div>
                                            <div className="identity-titles">
                                                <h2>{mockCurrentUser.name} <VerifiedIcon className="verified-glyph" /></h2>
                                                <p>{mockCurrentUser.role} Founder • {mockCurrentUser.location}</p>
                                            </div>
                                        </div>

                                        <div className="identity-fields-grid">
                                            <div className="control-group">
                                                <label>Full Professional Name</label>
                                                <input type="text" defaultValue={mockCurrentUser.name} />
                                            </div>
                                            <div className="control-group">
                                                <label>Current Location Base</label>
                                                <input type="text" defaultValue={mockCurrentUser.location} />
                                            </div>
                                            <div className="control-group">
                                                <label>Founder Domain</label>
                                                <select defaultValue={mockCurrentUser.role}>
                                                    <option>Tech Founder</option>
                                                    <option>Business Founder</option>
                                                    <option>Design Founder</option>
                                                    <option>Ops Founder</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bio-block glass">
                                        <div className="block-header">
                                            <h3>Short Professional Bio</h3>
                                            <button className="text-btn">Update</button>
                                        </div>
                                        <textarea defaultValue={mockCurrentUser.bio} rows={4} />
                                    </div>
                                </div>
                            )}

                            {/* ── EXPERTISE VIEW ── */}
                            {activeTab === 'expertise' && (
                                <div className="expertise-hub">
                                    <div className="exp-grid">
                                        <div className="exp-section glass">
                                            <div className="section-header-row">
                                                <div className="icon-badge primary"><SchoolIcon fontSize="small" /></div>
                                                <h3>Academic Credentials</h3>
                                            </div>
                                            <input type="text" defaultValue={mockCurrentUser.education} className="modern-input" />
                                        </div>

                                        <div className="exp-section glass">
                                            <div className="section-header-row">
                                                <div className="icon-badge secondary"><WorkIcon fontSize="small" /></div>
                                                <h3>Years of Tenure</h3>
                                            </div>
                                            <input type="number" defaultValue={mockCurrentUser.yearsOfExperience} className="modern-input" />
                                        </div>
                                    </div>

                                    <div className="full-width-section glass">
                                        <div className="block-header">
                                            <h3>Core Expertise Markers</h3>
                                            <button className="add-tag-btn">+ Add Skill</button>
                                        </div>
                                        <div className="interactive-tags">
                                            {mockCurrentUser.skills.map(skill => (
                                                <span key={skill} className="dash-tag">
                                                    {skill} <span className="tag-x">×</span>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── ALIGNMENT/EXPECTATIONS VIEW ── */}
                            {activeTab === 'alignment' && (
                                <div className="alignment-hub">
                                    <div className="vision-edit-card glass">
                                        <div className="section-header-row">
                                            <div className="icon-badge accent"><PsychologyIcon fontSize="small" /></div>
                                            <h3>Strategic Vision Pitch</h3>
                                        </div>
                                        <textarea defaultValue={mockCurrentUser.startupVision} rows={6} />
                                    </div>

                                    <div className="expectations-grid">
                                        <div className="glass-panel glass">
                                            <h3>Target Partners</h3>
                                            <div className="target-pills">
                                                {mockCurrentUser.lookingFor.map(role => (
                                                    <span key={role} className="target-pill">{role} <span className="tag-x">×</span></span>
                                                ))}
                                                <button className="add-pill">+ Add</button>
                                            </div>
                                        </div>
                                        <div className="glass-panel glass">
                                            <h3>Commitment Level</h3>
                                            <select defaultValue={mockCurrentUser.commitment} className="modern-select">
                                                <option>Full-time (Venture)</option>
                                                <option>Part-time (Advisory)</option>
                                                <option>Investment Only</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── PERFORMANCE VIEW ── */}
                            {activeTab === 'analytics' && (
                                <div className="analytics-hub">
                                    <div className="analytics-hero glass">
                                        <div className="a-stat">
                                            <span className="a-val">12.5k</span>
                                            <label>Network Impressions</label>
                                            <div className="a-trend pos">+24%</div>
                                        </div>
                                        <div className="a-divider" />
                                        <div className="a-stat">
                                            <span className="a-val">482</span>
                                            <label>Discovery Synergies</label>
                                            <div className="a-trend pos">+12%</div>
                                        </div>
                                        <div className="a-divider" />
                                        <div className="a-stat">
                                            <span className="a-val">34</span>
                                            <label>Confirmed Alliances</label>
                                            <div className="a-trend">Stable</div>
                                        </div>
                                    </div>

                                    <div className="discovery-health glass">
                                        <h3>Discovery Health Protocol</h3>
                                        <div className="health-bar-wrap">
                                            <div className="health-bar" style={{ width: '88%' }} />
                                        </div>
                                        <p>Your profile is 88% optimized for current Tier-1 ecosystem demands.</p>
                                    </div>
                                </div>
                            )}

                            {/* ── PREFERENCES VIEW ── */}
                            {activeTab === 'preferences' && (
                                <div className="preferences-hub">
                                    <div className="pref-section glass">
                                        <h3>Notification Protocols</h3>
                                        <div className="pref-row">
                                            <div className="pref-info">
                                                <label>Synergy Alerts</label>
                                                <p>Get notified when high-percent matches appear</p>
                                            </div>
                                            <div className="dash-toggle on"><div className="dash-toggle-knob" /></div>
                                        </div>
                                        <div className="pref-row">
                                            <div className="pref-info">
                                                <label>Strategic Inquiries</label>
                                                <p>Instant alerts for new message proposals</p>
                                            </div>
                                            <div className="dash-toggle on"><div className="dash-toggle-knob" /></div>
                                        </div>
                                    </div>
                                    <div className="pref-section glass">
                                        <h3>Privacy Controls</h3>
                                        <div className="pref-row">
                                            <div className="pref-info">
                                                <label>Public Indexing</label>
                                                <p>Allow profiles to be seen by verified search partners</p>
                                            </div>
                                            <div className="dash-toggle on"><div className="dash-toggle-knob" /></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default ProfilePage;
