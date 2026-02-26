import { useState } from 'react';
import { motion } from 'framer-motion';
import VerifiedIcon from '@mui/icons-material/Verified';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BoltIcon from '@mui/icons-material/Bolt';
import WorkIcon from '@mui/icons-material/Work';
import PsychologyIcon from '@mui/icons-material/Psychology';
import FM_logo from '../../assets/FM_logo.png';
import { mockFounders } from '../../data/mockFounders';
import './MatchesPage.css';

const introPrompts = [
    { icon: <PsychologyIcon fontSize="small" />, text: "Share my vision deck" },
    { icon: <WorkIcon fontSize="small" />, text: "Discuss role alignment" },
    { icon: <BoltIcon fontSize="small" />, text: "Ask about technical stack" }
];

const MatchesPage = () => {
    const [selectedId, setSelectedId] = useState(mockFounders[0].id);
    const [message, setMessage] = useState('');

    const selectedMatch = mockFounders.find(f => f.id === selectedId) || mockFounders[0];

    return (
        <div className="matches-hub-page">
            <div className="matches-hub-layout glass">

                {/* ── LEFT PANEL: DISCOVERY ALLIANCES ── */}
                <aside className="alliances-sidebar">
                    <header className="sidebar-brand-header">
                        <img src={FM_logo} alt="FM" className="sidebar-logo" />
                        <div className="brand-text">
                            <h2>Alliances</h2>
                            <p>Strategic Connections</p>
                        </div>
                    </header>

                    <div className="search-alliances">
                        <input type="text" placeholder="Search by name or role..." />
                    </div>

                    <div className="alliances-list">
                        {mockFounders.map(founder => (
                            <motion.button
                                key={founder.id}
                                className={`alliance-item ${selectedId === founder.id ? 'active' : ''}`}
                                onClick={() => setSelectedId(founder.id)}
                                whileHover={{ x: 4 }}
                            >
                                <div className="alliance-avatar">
                                    {founder.photoUrl ? (
                                        <img src={founder.photoUrl} alt={founder.name} />
                                    ) : (
                                        <span>{founder.name[0]}</span>
                                    )}
                                    {selectedId === founder.id && <div className="active-glow" />}
                                </div>
                                <div className="alliance-meta">
                                    <div className="alliance-name-row">
                                        <span className="alliance-name">{founder.name}</span>
                                        <span className="alliance-time">2h ago</span>
                                    </div>
                                    <div className="alliance-preview">
                                        {founder.role} • {founder.industries[0]}
                                    </div>
                                </div>
                                {selectedId === founder.id && <VerifiedIcon className="verified-status" fontSize="inherit" />}
                            </motion.button>
                        ))}
                    </div>
                </aside>

                {/* ── RIGHT PANEL: STRATEGIC SYNC ── */}
                <main className="sync-hub">
                    <header className="sync-header">
                        <div className="sync-user-context">
                            <div className="context-avatar-sm">
                                {selectedMatch.name[0]}
                            </div>
                            <div className="context-details">
                                <div className="context-name-row">
                                    <h3>{selectedMatch.name}</h3>
                                    <VerifiedIcon className="verified-icon" fontSize="inherit" />
                                </div>
                                <p>{selectedMatch.role} • {selectedMatch.location}</p>
                            </div>
                        </div>

                        <div className="sync-actions">
                            <button className="sync-btn-outline">
                                <CalendarMonthIcon fontSize="small" /> Schedule Sync
                            </button>
                            <button className="sync-icon-btn"><MoreVertIcon /></button>
                        </div>
                    </header>

                    <div className="sync-messages-viewport">
                        <div className="day-divider"><span>Protocol Initiated • Feb 24</span></div>

                        <div className="message-received">
                            <div className="msg-bubble glass">
                                I've analyzed your breakthrough vision for {selectedMatch.industries[0]}. The strategic alignment with my background at {selectedMatch.education} is remarkable.
                            </div>
                            <span className="msg-timestamp">10:42 AM</span>
                        </div>

                        <div className="message-sent">
                            <div className="msg-bubble">
                                Agreed. Your tenure in executive {selectedMatch.role} roles is exactly what our founding team needs to scale this protocol.
                            </div>
                            <span className="msg-timestamp">10:45 AM</span>
                        </div>

                        <div className="message-received">
                            <div className="msg-bubble glass">
                                Should we formalize a deep-dive sync to discuss the equity framework and technical milestones?
                            </div>
                            <span className="msg-timestamp">10:48 AM</span>
                        </div>
                    </div>

                    <footer className="sync-footer">
                        {/* ── QUICK INTRO PROMPTS ── */}
                        <div className="intro-prompts-row">
                            {introPrompts.map((prompt, idx) => (
                                <button key={idx} className="prompt-pill glass">
                                    {prompt.icon} {prompt.text}
                                </button>
                            ))}
                        </div>

                        <div className="sync-input-area glass">
                            <button className="input-action-btn"><AttachFileIcon /></button>
                            <textarea
                                placeholder="Formalize your proposal..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={1}
                            />
                            <button className="sync-send-btn">
                                <SendIcon />
                            </button>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default MatchesPage;
