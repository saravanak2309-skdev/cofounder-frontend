import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockMatches } from '../../data/mockMatches';
import { mockFounders } from '../../data/mockFounders';
import SkillBadge from '../../components/SkillBadge/SkillBadge';
import './MatchesPage.css';

const quickIntros = [
    '👋 Hey! Loved your profile. Can we chat?',
    '🚀 Your vision aligns with mine perfectly!',
    '☕ Would love a quick call to explore synergies.',
    '💡 I have some ideas I\'d love to share with you.',
];

const MatchesPage = () => {
    const [activeMatchId, setActiveMatchId] = useState<string | null>(mockMatches[0]?.id);
    const [messageInput, setMessageInput] = useState('');
    const [localMessages, setLocalMessages] = useState(mockMatches);

    const activeMatch = localMessages.find(m => m.id === activeMatchId);
    const activeFounder = activeMatch ? mockFounders.find(f => f.id === activeMatch.founderId) : null;

    const sendMessage = (text: string) => {
        if (!text.trim() || !activeMatchId) return;
        setLocalMessages(prev => prev.map(m => {
            if (m.id !== activeMatchId) return m;
            return {
                ...m,
                messages: [...m.messages, {
                    id: Date.now().toString(),
                    senderId: 'current',
                    receiverId: m.founderId,
                    text: text.trim(),
                    timestamp: new Date().toISOString(),
                    read: true,
                }],
            };
        }));
        setMessageInput('');
    };

    const formatTime = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const initials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

    return (
        <div className="matches-page">
            {/* Left panel - Match list */}
            <aside className="matches-list">
                <div className="matches-list-header">
                    <h2 className="matches-list-title">💬 Matches</h2>
                    <span className="matches-badge">{mockMatches.length}</span>
                </div>
                {mockMatches.map(match => {
                    const founder = mockFounders.find(f => f.id === match.founderId);
                    if (!founder) return null;
                    const lastMsg = match.messages[match.messages.length - 1];
                    const unreadCount = match.messages.filter(m => m.senderId !== 'current' && !m.read).length;
                    return (
                        <motion.button
                            key={match.id}
                            className={`match-item ${activeMatchId === match.id ? 'active' : ''}`}
                            onClick={() => setActiveMatchId(match.id)}
                            whileHover={{ x: 3 }}
                        >
                            <div className="match-avatar">
                                {initials(founder.name)}
                            </div>
                            <div className="match-info">
                                <div className="match-name-row">
                                    <span className="match-name">{founder.name}</span>
                                    {lastMsg && <span className="match-time">{formatTime(lastMsg.timestamp)}</span>}
                                </div>
                                <div className="match-skills">
                                    {founder.skills.slice(0, 2).map(s => (
                                        <SkillBadge key={s} label={s} variant="skill" />
                                    ))}
                                </div>
                                {lastMsg && (
                                    <p className="match-preview">{lastMsg.text.slice(0, 50)}...</p>
                                )}
                            </div>
                            {unreadCount > 0 && (
                                <div className="unread-badge">{unreadCount}</div>
                            )}
                            <div className={`active-indicator ${founder.lastActive?.includes('hour') || founder.lastActive === 'Now' ? 'online' : ''}`} title={`Last active: ${founder.lastActive}`} />
                        </motion.button>
                    );
                })}
            </aside>

            {/* Right panel - Chat */}
            <main className="chat-panel">
                {activeMatch && activeFounder ? (
                    <>
                        {/* Chat Header */}
                        <div className="chat-header">
                            <div className="chat-avatar">{initials(activeFounder.name)}</div>
                            <div className="chat-founder-info">
                                <h3 className="chat-founder-name">{activeFounder.name}</h3>
                                <p className="chat-founder-meta">{activeFounder.role} • {activeFounder.location}</p>
                            </div>
                            <div className="chat-actions">
                                <motion.button className="chat-action-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                    title="Schedule a Call">
                                    📅 Schedule a Call
                                </motion.button>
                                <motion.button className="chat-action-btn share-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                    title="Share Profile">
                                    🔗
                                </motion.button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="messages-area">
                            <div className="match-banner">
                                <span className="match-banner-icon">🎉</span>
                                <div>
                                    <p className="match-banner-title">You matched with {activeFounder.name}!</p>
                                    <p className="match-banner-date">Matched on {new Date(activeMatch.matchedAt).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <AnimatePresence>
                                {activeMatch.messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        className={`message ${msg.senderId === 'current' ? 'sent' : 'received'}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="message-bubble">
                                            <p className="message-text">{msg.text}</p>
                                        </div>
                                        <span className="message-time">{formatTime(msg.timestamp)}</span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Quick Intros */}
                        <div className="quick-intros">
                            {quickIntros.map((intro, i) => (
                                <button key={i} className="quick-intro-btn" onClick={() => sendMessage(intro)}>
                                    {intro}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="chat-input-area">
                            <input
                                className="chat-input"
                                placeholder="Write a message..."
                                value={messageInput}
                                onChange={e => setMessageInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && sendMessage(messageInput)}
                            />
                            <motion.button
                                className="send-btn"
                                onClick={() => sendMessage(messageInput)}
                                disabled={!messageInput.trim()}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                ➤
                            </motion.button>
                        </div>
                    </>
                ) : (
                    <div className="no-chat-selected">
                        <div className="no-chat-icon">💬</div>
                        <h3>Select a match to start chatting</h3>
                        <p>Your matched cofounders appear on the left.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default MatchesPage;
