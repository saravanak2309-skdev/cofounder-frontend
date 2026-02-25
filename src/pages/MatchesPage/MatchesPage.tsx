import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SendIcon from '@mui/icons-material/Send';
import CelebrationIcon from '@mui/icons-material/Celebration';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { mockMatches } from '../../data/mockMatches';
import { mockFounders } from '../../data/mockFounders';
import './MatchesPage.css';

const quickPrompts = [
    "🚀 Would love to dive deeper into your vision!",
    "🛠️ What's your current tech stack preference?",
    "☕ Open for a quick 15-min sync this week?",
    "💡 I have a few GTM ideas for your concept."
];

const MatchesPage = () => {
    const [activeMatchId, setActiveMatchId] = useState<string | null>(mockMatches[0]?.id || null);
    const [messageInput, setMessageInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [messages, setMessages] = useState(mockMatches);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [activeMatchId, messages]);

    const activeMatch = useMemo(() =>
        messages.find(m => m.id === activeMatchId),
        [activeMatchId, messages]);

    const activeFounder = useMemo(() =>
        activeMatch ? mockFounders.find(f => f.id === activeMatch.founderId) : null,
        [activeMatch]);

    const filteredMatches = useMemo(() => {
        return messages.filter(m => {
            const founder = mockFounders.find(f => f.id === m.founderId);
            return founder?.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
    }, [messages, searchQuery]);

    const handleSendMessage = (text: string) => {
        if (!text.trim() || !activeMatchId) return;

        const newMessage = {
            id: Date.now().toString(),
            senderId: 'current',
            receiverId: activeMatch?.founderId || '',
            text: text.trim(),
            timestamp: new Date().toISOString(),
            read: true
        };

        setMessages(prev => prev.map(m =>
            m.id === activeMatchId
                ? { ...m, messages: [...m.messages, newMessage] }
                : m
        ));
        setMessageInput('');
    };

    const formatTime = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

    return (
        <div className="matches-page">
            <div className="mp-glow mp-glow-1" />
            <div className="mp-glow mp-glow-2" />

            {/* Sidebar - Match Discovery List */}
            <aside className="matches-list">
                <div className="ml-header">
                    <div className="ml-title-row">
                        <h2><ChatBubbleOutlineIcon sx={{ color: 'var(--primary)' }} /> Messages</h2>
                    </div>
                    <div className="ml-search">
                        <SearchIcon className="ml-search-icon" fontSize="small" />
                        <input
                            placeholder="Search partners..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="ml-items">
                    {filteredMatches.map(match => {
                        const founder = mockFounders.find(f => f.id === match.founderId);
                        if (!founder) return null;

                        const lastMsg = match.messages[match.messages.length - 1];
                        const unreadCount = match.messages.filter(m => m.senderId !== 'current' && !m.read).length;
                        const isActive = activeMatchId === match.id;

                        return (
                            <motion.button
                                key={match.id}
                                className={`ml-item ${isActive ? 'active' : ''}`}
                                onClick={() => setActiveMatchId(match.id)}
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="ml-avatar-wrap">
                                    <div className="ml-avatar">{getInitials(founder.name)}</div>
                                    <div className="ml-status" />
                                </div>
                                <div className="ml-info">
                                    <div className="ml-name-row">
                                        <span className="ml-name">{founder.name}</span>
                                        {lastMsg && <span className="ml-time">{formatTime(lastMsg.timestamp)}</span>}
                                    </div>
                                    <p className="ml-preview">{lastMsg?.text || "No messages yet"}</p>
                                </div>
                                {unreadCount > 0 && <div className="ml-unread">{unreadCount}</div>}
                            </motion.button>
                        );
                    })}
                </div>
            </aside>

            {/* Main Chat Interface */}
            <main className="chat-panel">
                {activeMatch && activeFounder ? (
                    <>
                        <header className="cp-header">
                            <div className="cp-avatar">{getInitials(activeFounder.name)}</div>
                            <div className="cp-info">
                                <h3 className="cp-name">{activeFounder.name}</h3>
                                <p className="cp-status">Active {activeFounder.lastActive || "Recently"}</p>
                            </div>
                            <div className="cp-actions">
                                <button className="btn-schedule">
                                    <CalendarMonthIcon fontSize="small" /> Schedule Sync
                                </button>
                                <button className="ml-search-icon" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    <MoreVertIcon sx={{ color: 'var(--text-muted)' }} />
                                </button>
                            </div>
                        </header>

                        <div className="cp-messages" ref={scrollRef}>
                            <div className="match-anniversary">
                                <div className="ma-icon"><CelebrationIcon /></div>
                                <p className="ma-text">Partnership Discovered • {new Date(activeMatch.matchedAt).toLocaleDateString()}</p>
                            </div>

                            <AnimatePresence initial={false}>
                                {activeMatch.messages.map(msg => (
                                    <motion.div
                                        key={msg.id}
                                        className={`msg-wrapper ${msg.senderId === 'current' ? 'msg-sent' : 'msg-received'}`}
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="msg-bubble">
                                            {msg.text}
                                        </div>
                                        <span className="msg-time">{formatTime(msg.timestamp)}</span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <footer className="cp-footer">
                            <div className="cp-prompts">
                                {quickPrompts.map(prompt => (
                                    <button
                                        key={prompt}
                                        className="cp-prompt"
                                        onClick={() => handleSendMessage(prompt)}
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                            <div className="cp-input-wrap">
                                <input
                                    placeholder="Type your strategic proposal..."
                                    value={messageInput}
                                    onChange={e => setMessageInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSendMessage(messageInput)}
                                />
                                <motion.button
                                    className="cp-send-btn"
                                    onClick={() => handleSendMessage(messageInput)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    disabled={!messageInput.trim()}
                                >
                                    <SendIcon fontSize="small" />
                                </motion.button>
                            </div>
                        </footer>
                    </>
                ) : (
                    <div className="no-selection">
                        <ChatBubbleOutlineIcon className="no-selection-icon" />
                        <h3>Your Strategic Hub</h3>
                        <p>Select a match to discuss your next billion-dollar venture.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default MatchesPage;
