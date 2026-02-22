import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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

    const navItems: { key: Section; icon: string; label: string }[] = [
        { key: 'profile', icon: '👤', label: 'My Profile' },
        { key: 'skills', icon: '⚡', label: 'Skills & Experience' },
        { key: 'expectations', icon: '🎯', label: 'Expectations' },
        { key: 'preferences', icon: '⚙️', label: 'Preferences' },
        { key: 'visibility', icon: '👁️', label: 'Visibility' },
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

    const initials = profile.name.split(' ').map(n => n[0]).join('').toUpperCase();

    return (
        <div className="profile-page">
            {/* Sidebar */}
            <aside className="profile-sidebar">
                <div className="profile-identity">
                    <div className="profile-avatar-large">{initials}</div>
                    <h2 className="profile-name">{profile.name}</h2>
                    <p className="profile-role-text">{profile.role} Founder</p>
                    <p className="profile-location-text">📍 {profile.location}</p>
                </div>

                <nav className="profile-nav">
                    {navItems.map(item => (
                        <button
                            key={item.key}
                            className={`profile-nav-item ${activeSection === item.key ? 'active' : ''}`}
                            onClick={() => setActiveSection(item.key)}
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>

                <button
                    className="logout-btn"
                    onClick={() => navigate('/')}
                >
                    ← Log Out
                </button>
            </aside>

            {/* Main content */}
            <main className="profile-main">
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {/* My Profile Section */}
                    {activeSection === 'profile' && (
                        <div className="section-content">
                            <div className="section-header">
                                <h2 className="section-title">My Profile</h2>
                                <button className="edit-btn" onClick={() => setEditing(!editing)}>
                                    {editing ? '✓ Save' : '✏️ Edit'}
                                </button>
                            </div>

                            <div className="profile-card-view">
                                <div className="view-row">
                                    <div className="form-group">
                                        <label className="form-label">Full Name</label>
                                        <input className="form-input" value={profile.name} disabled={!editing}
                                            onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Location</label>
                                        <input className="form-input" value={profile.location} disabled={!editing}
                                            onChange={e => setProfile(p => ({ ...p, location: e.target.value }))} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Bio</label>
                                    <textarea className="form-input form-textarea" value={profile.bio} disabled={!editing}
                                        rows={5} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Startup Vision</label>
                                    <textarea className="form-input form-textarea" value={profile.startupVision} disabled={!editing}
                                        rows={3} onChange={e => setProfile(p => ({ ...p, startupVision: e.target.value }))} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Skills Section */}
                    {activeSection === 'skills' && (
                        <div className="section-content">
                            <div className="section-header">
                                <h2 className="section-title">Skills & Experience</h2>
                            </div>

                            <div className="info-cards-row">
                                <div className="info-card">
                                    <div className="info-card-icon">🎓</div>
                                    <div>
                                        <p className="info-card-label">Education</p>
                                        <p className="info-card-value">{profile.education}</p>
                                    </div>
                                </div>
                                <div className="info-card">
                                    <div className="info-card-icon">⏱️</div>
                                    <div>
                                        <p className="info-card-label">Experience</p>
                                        <p className="info-card-value">{profile.yearsOfExperience} years</p>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Skills (press Enter to add)</label>
                                <input className="form-input" placeholder="Add a skill..." value={skillInput}
                                    onChange={e => setSkillInput(e.target.value)} onKeyDown={addSkill} />
                                <div className="tags-container">
                                    {profile.skills.map(s => (
                                        <SkillBadge key={s} label={s} variant="skill" onRemove={() => removeSkill(s)} />
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Domain Expertise</label>
                                <div className="tags-container">
                                    {profile.industries.map(ind => (
                                        <SkillBadge key={ind} label={ind} variant="domain" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Expectations Section */}
                    {activeSection === 'expectations' && (
                        <div className="section-content">
                            <div className="section-header">
                                <h2 className="section-title">Expectations</h2>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Commitment Level</label>
                                <div className="toggle-group">
                                    {['Full-time', 'Part-time'].map(c => (
                                        <button key={c}
                                            className={`toggle-btn ${profile.commitment === c ? 'active' : ''}`}
                                            onClick={() => setProfile(p => ({ ...p, commitment: c as 'Full-time' | 'Part-time' }))}>
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Looking For</label>
                                <div className="multi-select">
                                    {(['Tech', 'Business', 'Design', 'Operations', 'Other'] as const).map(role => (
                                        <button key={role}
                                            className={`chip-btn ${profile.lookingFor.includes(role) ? 'active' : ''}`}
                                            onClick={() => setProfile(p => ({
                                                ...p,
                                                lookingFor: p.lookingFor.includes(role)
                                                    ? p.lookingFor.filter(r => r !== role)
                                                    : [...p.lookingFor, role],
                                            }))}>
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Startup Vision</label>
                                <textarea className="form-input form-textarea" value={profile.startupVision} rows={4}
                                    onChange={e => setProfile(p => ({ ...p, startupVision: e.target.value }))} />
                            </div>
                        </div>
                    )}

                    {/* Preferences Section */}
                    {activeSection === 'preferences' && (
                        <div className="section-content">
                            <div className="section-header">
                                <h2 className="section-title">Preferences</h2>
                            </div>
                            <div className="pref-cards">
                                <div className="pref-card">
                                    <div className="pref-card-icon">🔔</div>
                                    <div className="pref-card-content">
                                        <h3 className="pref-card-title">Email Notifications</h3>
                                        <p className="pref-card-desc">New matches and messages</p>
                                    </div>
                                    <label className="toggle-switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider" />
                                    </label>
                                </div>
                                <div className="pref-card">
                                    <div className="pref-card-icon">📱</div>
                                    <div className="pref-card-content">
                                        <h3 className="pref-card-title">Push Notifications</h3>
                                        <p className="pref-card-desc">Real-time match alerts</p>
                                    </div>
                                    <label className="toggle-switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider" />
                                    </label>
                                </div>
                                <div className="pref-card">
                                    <div className="pref-card-icon">🌏</div>
                                    <div className="pref-card-content">
                                        <h3 className="pref-card-title">Location Matching</h3>
                                        <p className="pref-card-desc">Match with nearby founders first</p>
                                    </div>
                                    <label className="toggle-switch">
                                        <input type="checkbox" />
                                        <span className="slider" />
                                    </label>
                                </div>
                                <div className="pref-card">
                                    <div className="pref-card-icon">🔒</div>
                                    <div className="pref-card-content">
                                        <h3 className="pref-card-title">Privacy Mode</h3>
                                        <p className="pref-card-desc">Only matched users can see your full profile</p>
                                    </div>
                                    <label className="toggle-switch">
                                        <input type="checkbox" />
                                        <span className="slider" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Visibility Section */}
                    {activeSection === 'visibility' && (
                        <div className="section-content">
                            <div className="section-header">
                                <h2 className="section-title">Profile Visibility</h2>
                            </div>

                            <div className="visibility-card">
                                <div className="visibility-icon">{visibility ? '👁️' : '🙈'}</div>
                                <div className="visibility-info">
                                    <h3>{visibility ? 'Your profile is visible' : 'Your profile is hidden'}</h3>
                                    <p>{visibility
                                        ? 'Other founders can discover and swipe on your profile.'
                                        : 'Your profile is hidden from discovery. You can still browse and match.'
                                    }</p>
                                </div>
                                <motion.button
                                    className={`visibility-toggle ${visibility ? 'visible' : 'hidden'}`}
                                    onClick={() => setVisibility(!visibility)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    {visibility ? 'Hide Profile' : 'Show Profile'}
                                </motion.button>
                            </div>

                            <div className="stats-grid">
                                <div className="stat-tile">
                                    <span className="stat-tile-num">24</span>
                                    <span className="stat-tile-label">Profile Views</span>
                                </div>
                                <div className="stat-tile">
                                    <span className="stat-tile-num">8</span>
                                    <span className="stat-tile-label">Connections</span>
                                </div>
                                <div className="stat-tile">
                                    <span className="stat-tile-num">3</span>
                                    <span className="stat-tile-label">Matches</span>
                                </div>
                                <div className="stat-tile">
                                    <span className="stat-tile-num">12</span>
                                    <span className="stat-tile-label">Right Swipes</span>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </main>
        </div>
    );
};

export default ProfilePage;
