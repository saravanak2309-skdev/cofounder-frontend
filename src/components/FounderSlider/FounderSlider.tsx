import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BoltIcon from '@mui/icons-material/Bolt';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './FounderSlider.css';

const founders = [
    {
        id: 1,
        name: 'Alex Chen',
        role: 'Tech Founder',
        location: 'San Francisco, CA',
        avatar: 'https://i.pravatar.cc/150?img=68',
        skills: ['React', 'AI/ML', 'Node.js', 'System Design'],
        bio: 'Ex-Stripe engineering lead building next-gen AI developer tools. Looking for a visionary business co-founder.',
        match: 98,
        lookingFor: 'Business Co-founder',
        badge: 'bg-purple',
        online: true,
    },
    {
        id: 2,
        name: 'Priya Sharma',
        role: 'Business Founder',
        location: 'Bangalore, India',
        avatar: 'https://i.pravatar.cc/150?img=47',
        skills: ['Growth', 'BD', 'FinTech', 'Strategy'],
        bio: 'Ex-McKinsey consultant with 2 successful exits. Building a B2B SaaS for SME lending. Need a strong CTO.',
        match: 95,
        lookingFor: 'Tech Co-founder',
        badge: 'bg-blue',
        online: true,
    },
    {
        id: 3,
        name: 'Marcus Johnson',
        role: 'Product Founder',
        location: 'New York, NY',
        avatar: 'https://i.pravatar.cc/150?img=32',
        skills: ['Product', 'UX', 'EdTech', 'B2C'],
        bio: 'Former PM at Notion building an adaptive learning platform for Gen Z. Looking for a design or tech partner.',
        match: 91,
        lookingFor: 'Design Co-founder',
        badge: 'bg-green',
        online: false,
    },
    {
        id: 4,
        name: 'Zara Patel',
        role: 'Design Founder',
        location: 'London, UK',
        avatar: 'https://i.pravatar.cc/150?img=44',
        skills: ['Figma', 'Brand', 'HealthTech', 'Motion'],
        bio: 'Lead designer at NHS Digital turned founder. Creating patient-first mental health app. Seeking a clinical + tech partner.',
        match: 89,
        lookingFor: 'Tech Co-founder',
        badge: 'bg-pink',
        online: true,
    },
    {
        id: 5,
        name: 'Liam O\'Brien',
        role: 'Tech Founder',
        location: 'Dublin, Ireland',
        avatar: 'https://i.pravatar.cc/150?img=53',
        skills: ['Python', 'ML', 'CleanTech', 'Data'],
        bio: 'PhD in Climate Science + 5 yrs at DeepMind. Building carbon credit verification using satellite ML. Need a business mind.',
        match: 93,
        lookingFor: 'Business Co-founder',
        badge: 'bg-teal',
        online: false,
    },
    {
        id: 6,
        name: 'Aisha Mohammed',
        role: 'Ops Founder',
        location: 'Dubai, UAE',
        avatar: 'https://i.pravatar.cc/150?img=25',
        skills: ['Ops', 'Logistics', 'Supply Chain', 'MENA'],
        bio: 'Ex-Amazon Logistics lead building last-mile delivery infra for emerging markets. Looking for a tech co-founder.',
        match: 87,
        lookingFor: 'Tech Co-founder',
        badge: 'bg-orange',
        online: true,
    },
    {
        id: 7,
        name: 'Kenji Tanaka',
        role: 'Tech Founder',
        location: 'Tokyo, Japan',
        avatar: 'https://i.pravatar.cc/150?img=61',
        skills: ['Web3', 'Solidity', 'GameFi', 'Unity'],
        bio: 'Built 3 web3 games with 100k+ players. Now building play-to-earn infrastructure. Need a business + community co-founder.',
        match: 85,
        lookingFor: 'Business Co-founder',
        badge: 'bg-purple',
        online: true,
    },
    {
        id: 8,
        name: 'Sofia Rossi',
        role: 'Business Founder',
        location: 'Milan, Italy',
        avatar: 'https://i.pravatar.cc/150?img=36',
        skills: ['D2C', 'E-Commerce', 'Brand', 'Marketing'],
        bio: 'Scaled a D2C skincare brand to €5M ARR. Building AI-powered personalised beauty platform. Need a ML engineer.',
        match: 90,
        lookingFor: 'Tech Co-founder',
        badge: 'bg-blue',
        online: false,
    },
    {
        id: 9,
        name: 'David Osei',
        role: 'Domain Expert',
        location: 'Lagos, Nigeria',
        avatar: 'https://i.pravatar.cc/150?img=15',
        skills: ['AgriTech', 'Impact', 'B2B', 'Africa'],
        bio: 'Agricultural economist & policy advisor building precision farming tools for smallholders across West Africa.',
        match: 82,
        lookingFor: 'Tech Co-founder',
        badge: 'bg-green',
        online: true,
    },
    {
        id: 10,
        name: 'Emma Larsson',
        role: 'Product Founder',
        location: 'Stockholm, Sweden',
        avatar: 'https://i.pravatar.cc/150?img=9',
        skills: ['SaaS', 'HR Tech', 'PLG', 'Analytics'],
        bio: 'Ex-Spotify product lead building an AI-powered HR co-pilot for remote teams. Seeking a technical co-founder.',
        match: 88,
        lookingFor: 'Tech Co-founder',
        badge: 'bg-teal',
        online: true,
    },
    {
        id: 11,
        name: 'Ravi Menon',
        role: 'Tech Founder',
        location: 'Singapore',
        avatar: 'https://i.pravatar.cc/150?img=57',
        skills: ['Go', 'Fintech', 'Payments', 'APAC'],
        bio: 'Built payment infra at GrabPay. Now solving cross-border B2B payments for SEA. Looking for a regulatory + biz founder.',
        match: 94,
        lookingFor: 'Business Co-founder',
        badge: 'bg-orange',
        online: false,
    },
    {
        id: 12,
        name: 'Isabella Cruz',
        role: 'Business Founder',
        location: 'São Paulo, Brazil',
        avatar: 'https://i.pravatar.cc/150?img=20',
        skills: ['LegalTech', 'B2B SaaS', 'LATAM', 'GTM'],
        bio: 'Former BigLaw attorney automating contract review for LATAM enterprises. Closed first 5 enterprise pilots. Need CTO.',
        match: 86,
        lookingFor: 'Tech Co-founder',
        badge: 'bg-pink',
        online: true,
    },
];

const badgeColors: Record<string, string> = {
    'bg-purple': 'rgba(167,139,250,0.18)',
    'bg-blue': 'rgba(96,165,250,0.18)',
    'bg-green': 'rgba(52,211,153,0.18)',
    'bg-pink': 'rgba(244,114,182,0.18)',
    'bg-teal': 'rgba(45,212,191,0.18)',
    'bg-orange': 'rgba(251,146,60,0.18)',
};

const badgeBorder: Record<string, string> = {
    'bg-purple': 'rgba(167,139,250,0.35)',
    'bg-blue': 'rgba(96,165,250,0.35)',
    'bg-green': 'rgba(52,211,153,0.35)',
    'bg-pink': 'rgba(244,114,182,0.35)',
    'bg-teal': 'rgba(45,212,191,0.35)',
    'bg-orange': 'rgba(251,146,60,0.35)',
};

const badgeText: Record<string, string> = {
    'bg-purple': '#c4b5fd',
    'bg-blue': '#93c5fd',
    'bg-green': '#6ee7b7',
    'bg-pink': '#f9a8d4',
    'bg-teal': '#99f6e4',
    'bg-orange': '#fed7aa',
};

export default function FounderSlider() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const [liked, setLiked] = useState<Set<number>>(new Set());
    const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const total = founders.length;

    const go = (dir: number) => {
        setDirection(dir);
        setCurrent((prev) => (prev + dir + total) % total);
    };

    const startAuto = () => {
        if (autoRef.current) clearInterval(autoRef.current);
        autoRef.current = setInterval(() => {
            setDirection(1);
            setCurrent((prev) => (prev + 1) % total);
        }, 4000);
    };

    useEffect(() => {
        startAuto();
        return () => { if (autoRef.current) clearInterval(autoRef.current); };
    }, []);

    const handleNav = (dir: number) => {
        go(dir);
        startAuto();
    };

    const handleLike = (id: number) => {
        setLiked((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const founder = founders[current];

    // Visible dots: show max 5 around current
    const dotRange = Array.from({ length: total }, (_, i) => i);

    return (
        <div className="slider-wrapper">
            {/* Side previews */}
            <div className="slider-preview slider-preview-left">
                {founders[(current - 1 + total) % total] && (
                    <img
                        src={founders[(current - 1 + total) % total].avatar}
                        alt="prev"
                        className="preview-avatar"
                    />
                )}
            </div>

            {/* Main card area */}
            <div className="slider-stage">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={founder.id}
                        className="founder-card"
                        custom={direction}
                        initial={{ opacity: 0, x: direction * 80, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -direction * 80, scale: 0.95 }}
                        transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                    >
                        {/* Ambient card glow */}
                        <div className="card-glow" />

                        {/* Header */}
                        <div className="fc-header">
                            <div className="fc-avatar-wrap">
                                <img src={founder.avatar} alt={founder.name} className="fc-avatar" />
                                {founder.online && <div className="fc-online-dot" />}
                            </div>
                            <div className="fc-header-info">
                                <h3 className="fc-name">{founder.name}</h3>
                                <p className="fc-role">{founder.role}</p>
                                <p className="fc-location">
                                    <LocationOnIcon style={{ fontSize: '0.8rem', verticalAlign: 'middle' }} />
                                    {founder.location}
                                </p>
                            </div>
                            <div className="fc-match-badge">
                                <span className="fc-match-num">{founder.match}%</span>
                                <span className="fc-match-label">match</span>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="fc-skills">
                            {founder.skills.map(s => (
                                <span key={s} className="fc-skill">{s}</span>
                            ))}
                        </div>

                        {/* Bio */}
                        <p className="fc-bio">{founder.bio}</p>

                        {/* Looking for */}
                        <div
                            className="fc-looking"
                            style={{
                                background: badgeColors[founder.badge],
                                borderColor: badgeBorder[founder.badge],
                                color: badgeText[founder.badge],
                            }}
                        >
                            Looking for: <strong>{founder.lookingFor}</strong>
                        </div>

                        {/* Actions */}
                        <div className="fc-actions">
                            <button
                                className={`fc-like-btn ${liked.has(founder.id) ? 'liked' : ''}`}
                                onClick={() => handleLike(founder.id)}
                            >
                                <FavoriteIcon fontSize="small" />
                                {liked.has(founder.id) ? 'Liked' : 'Like'}
                            </button>
                            <button className="fc-connect-btn">
                                <BoltIcon fontSize="small" /> Connect
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Nav arrows */}
                <button className="slider-arrow slider-arrow-left" onClick={() => handleNav(-1)}>
                    <ChevronLeftIcon />
                </button>
                <button className="slider-arrow slider-arrow-right" onClick={() => handleNav(1)}>
                    <ChevronRightIcon />
                </button>
            </div>

            {/* Side preview right */}
            <div className="slider-preview slider-preview-right">
                {founders[(current + 1) % total] && (
                    <img
                        src={founders[(current + 1) % total].avatar}
                        alt="next"
                        className="preview-avatar"
                    />
                )}
            </div>

            {/* Dots */}
            <div className="slider-dots">
                {dotRange.map((i) => (
                    <button
                        key={i}
                        className={`slider-dot ${i === current ? 'active' : ''}`}
                        onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); startAuto(); }}
                    />
                ))}
            </div>

            {/* Counter */}
            <p className="slider-counter">{current + 1} / {total} founders</p>
        </div>
    );
}