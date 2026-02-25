import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import BoltIcon from '@mui/icons-material/Bolt';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import LogoutIcon from '@mui/icons-material/Logout';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SkillBadge from '../../components/SkillBadge/SkillBadge';
import { mockCurrentUser } from '../../data/mockFounders';
import './ProfilePage.css';

type Section = 'profile' | 'skills' | 'expectations' | 'preferences' | 'visibility';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<Section>('profile');
    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState(mockCurrentUser);
    const [skillInput, setSkillInput] = useState('');
    const [visibility, setVisibility] = useState(true);

    const navItems: { key: Section; icon: React.ReactNode; label: string }[] = [
        { key: 'profile', icon: <PersonIcon />, label: 'Identity' },
        { key: 'skills', icon: <BoltIcon />, label: 'Expertise' },
        { key: 'expectations', icon: <TrackChangesIcon />, label: 'Discovery' },
        { key: 'preferences', icon: <SettingsIcon />, label: 'Preferences' },
        { key: 'visibility', icon: <VisibilityIcon />, label: 'Visibility' },
    ];

    const addSkill = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            e.preventDefault();
            if (!profile.skills.includes(skillInput.trim())) {
                setProfile(p => ({ ...p, skills: [...p.skills, skillInput.trim()] }));
            }
            setSkillInput('');
        }
    };

    const removeSkill = (skill: string) => {
        setProfile(p => ({ ...p, skills: p.skills.filter(s => s !== skill) }));
    };

    const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

    return (
        <div className="profile-page">
            <div className="pd-glow pd-glow-1" />
            <div className="pd-glow pd-glow-2" />

            {/* Premium Sidebar */}
            <aside className="profile-sidebar">
                <div className="profile-identity">
                    <div className="profile-avatar-large">{getInitials(profile.name)}</div>
                    <h2 className="profile-name">{profile.name}</h2>
                    <p className="profile-role-text">{profile.role} Founder</p>
                    <p className="profile-location-text">
                        <LocationOnIcon fontSize="inherit" /> {profile.location}
                    </p>
                </div>

                <nav className="profile-nav">
                    {navItems.map(item => (
                        <button
                            key={item.key}
                            className={`profile-nav-item ${activeSection === item.key ? 'active' : ''}`}
                            onClick={() => setActiveSection(item.key)}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <button className="logout-btn" onClick={() => navigate('/')}>
                    <LogoutIcon fontSize="small" /> Sign Out
                </button>
            </aside>

            {/* Main Content Dashboard */}
            <main className="profile-main">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="section-content"
                    >
                        {/* ── IDENTITY SECTION ── */}
                        {activeSection === 'profile' && (
                            <>
                                <div className="section-header">
                                    <h2 className="section-title">Personal Identity</h2>
                                    <button className="edit-btn" onClick={() => setEditing(!editing)}>
                                        {editing ? <><CheckIcon fontSize="inherit" /> Save Details</> : <><EditIcon fontSize="inherit" /> Edit Profile</>}
                                    </button>
                                </div>

                                <div className="dashboard-card">
                                    <div className="view-row">
                                        <div className="form-group">
                                            <label className="form-label">Full Name</label>
                                            <input
                                                className="form-input"
                                                value={profile.name}
                                                disabled={!editing}
                                                onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Location Base</label>
                                            <input
                                                className="form-input"
                                                value={profile.location}
                                                disabled={!editing}
                                                onChange={e => setProfile(p => ({ ...p, location: e.target.value }))}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Executive Bio</label>
                                        <textarea
                                            className="form-input form-textarea"
                                            value={profile.bio}
                                            disabled={!editing}
                                            rows={5}
                                            onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                                        />
                                    </div>
                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                        <label className="form-label">Startup Vision / Current Status</label>
                                        <textarea
                                            className="form-input form-textarea"
                                            value={profile.startupVision}
                                            disabled={!editing}
                                            rows={3}
                                            onChange={e => setProfile(p => ({ ...p, startupVision: e.target.value }))}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* ── EXPERTISE SECTION ── */}
                        {activeSection === 'skills' && (
                            <>
                                <div className="section-header">
                                    <h2 className="section-title">Domain Expertise</h2>
                                </div>

                                <div className="info-cards-row">
                                    <div className="info-card">
                                        <div className="info-card-icon"><SchoolIcon fontSize="inherit" /></div>
                                        <div>
                                            <p className="info-card-label">Academic Background</p>
                                            <p className="info-card-value">{profile.education}</p>
                                        </div>
                                    </div>
                                    <div className="info-card">
                                        <div className="info-card-icon"><AccessTimeIcon fontSize="inherit" /></div>
                                        <div>
                                            <p className="info-card-label">Professional Tenure</p>
                                            <p className="info-card-value">{profile.yearsOfExperience} Years</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="dashboard-card">
                                    <div className="form-group">
                                        <label className="form-label">Strategic Skills (Press Enter)</label>
                                        <input
                                            className="form-input"
                                            placeholder="Add tech, design, or growth expertise..."
                                            value={skillInput}
                                            onChange={e => setSkillInput(e.target.value)}
                                            onKeyDown={addSkill}
                                        />
                                        <div className="tags-container">
                                            {profile.skills.map(s => (
                                                <SkillBadge key={s} label={s} variant="skill" onRemove={() => removeSkill(s)} />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                        <label className="form-label">Industry Domains</label>
                                        <div className="tags-container">
                                            {profile.industries.map(ind => (
                                                <SkillBadge key={ind} label={ind} variant="domain" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* ── DISCOVERY SECTION ── */}
                        {activeSection === 'expectations' && (
                            <>
                                <div className="section-header">
                                    <h2 className="section-title">Discovery Preferences</h2>
                                </div>

                                <div className="dashboard-card">
                                    <div className="form-group">
                                        <label className="form-label">Founder Commitment</label>
                                        <div className="toggle-group">
                                            {(['Full-time', 'Part-time'] as const).map(c => (
                                                <button
                                                    key={c}
                                                    className={`toggle-btn ${profile.commitment === c ? 'active' : ''}`}
                                                    onClick={() => setProfile(p => ({ ...p, commitment: c }))}
                                                >
                                                    {c} Engagement
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Desired Cofounder Roles</label>
                                        <div className="tags-container">
                                            {(['Tech', 'Business', 'Design', 'Operations'] as const).map(role => (
                                                <button
                                                    key={role}
                                                    className={`chip-btn ${profile.lookingFor.includes(role) ? 'active' : ''}`}
                                                    onClick={() => setProfile(p => ({
                                                        ...p,
                                                        lookingFor: p.lookingFor.includes(role)
                                                            ? p.lookingFor.filter(r => r !== role)
                                                            : [...p.lookingFor, role],
                                                    }))}
                                                >
                                                    <BusinessCenterIcon fontSize="inherit" style={{ marginRight: '6px' }} />
                                                    {role} Partner
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* ── PREFERENCES SECTION ── */}
                        {activeSection === 'preferences' && (
                            <>
                                <div className="section-header">
                                    <h2 className="section-title">Account Preferences</h2>
                                </div>
                                <div className="pref-cards">
                                    <div className="pref-card">
                                        <div className="pref-card-icon"><NotificationsIcon fontSize="inherit" /></div>
                                        <div className="pref-card-content">
                                            <h3 className="pref-card-title">Discovery Notifications</h3>
                                            <p className="pref-card-desc">Alert me when top-tier founders match my vision</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input type="checkbox" defaultChecked />
                                            <span className="slider" />
                                        </label>
                                    </div>
                                    <div className="pref-card">
                                        <div className="pref-card-icon"><PhoneIphoneIcon fontSize="inherit" /></div>
                                        <div className="pref-card-content">
                                            <h3 className="pref-card-title">Real-time Messaging</h3>
                                            <p className="pref-card-desc">Browser and mobile push for active chats</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input type="checkbox" defaultChecked />
                                            <span className="slider" />
                                        </label>
                                    </div>
                                    <div className="pref-card">
                                        <div className="pref-card-icon"><PublicIcon fontSize="inherit" /></div>
                                        <div className="pref-card-content">
                                            <h3 className="pref-card-title">Radius Optimization</h3>
                                            <p className="pref-card-desc">Prioritize matches within your geographic proximity</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input type="checkbox" />
                                            <span className="slider" />
                                        </label>
                                    </div>
                                    <div className="pref-card">
                                        <div className="pref-card-icon"><LockIcon fontSize="inherit" /></div>
                                        <div className="pref-card-content">
                                            <h3 className="pref-card-title">Incognito Discovery</h3>
                                            <p className="pref-card-desc">Only matched founders can view your detailed credentials</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input type="checkbox" />
                                            <span className="slider" />
                                        </label>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* ── VISIBILITY SECTION ── */}
                        {activeSection === 'visibility' && (
                            <>
                                <div className="section-header">
                                    <h2 className="section-title">Presence & Analytics</h2>
                                </div>

                                <div className="visibility-card">
                                    <div className="visibility-icon">
                                        {visibility ? <VisibilityIcon fontSize="inherit" /> : <VisibilityOffIcon fontSize="inherit" />}
                                    </div>
                                    <div className="visibility-info">
                                        <h3>Discovery Status: {visibility ? 'Active' : 'Stealth'}</h3>
                                        <p>{visibility
                                            ? 'You are currently visible to the talent pool. Top founders can find and connect with you.'
                                            : 'Your profile is currently hidden from discovery. You can still manage existing matches.'
                                        }</p>
                                    </div>
                                    <motion.button
                                        className={`visibility-toggle ${visibility ? 'visible' : 'hidden'}`}
                                        onClick={() => setVisibility(!visibility)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {visibility ? 'Switch to Stealth' : 'Activate Discovery'}
                                    </motion.button>
                                </div>

                                <div className="stats-grid">
                                    <div className="stat-tile">
                                        <span className="stat-tile-num">128</span>
                                        <span className="stat-tile-label">Discovery Impressions</span>
                                    </div>
                                    <div className="stat-tile">
                                        <span className="stat-tile-num">34</span>
                                        <span className="stat-tile-label">Intentional Swipes</span>
                                    </div>
                                    <div className="stat-tile">
                                        <span className="stat-tile-num">12</span>
                                        <span className="stat-tile-label">Strategic Matches</span>
                                    </div>
                                    <div className="stat-tile">
                                        <span className="stat-tile-num">92%</span>
                                        <span className="stat-tile-label">Profile Strength</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default ProfilePage;
