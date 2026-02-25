import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TuneIcon from '@mui/icons-material/Tune';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BoltIcon from '@mui/icons-material/Bolt';
import FactoryIcon from '@mui/icons-material/Factory';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import GroupIcon from '@mui/icons-material/Group';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import HistoryIcon from '@mui/icons-material/History';
import FounderCard from '../../components/FounderCard/FounderCard';
import { mockFounders } from '../../data/mockFounders';
import './FiltersPage.css';

const skillOptions = ['React', 'Node.js', 'Python', 'AI/ML', 'Product Strategy', 'Growth', 'GTM', 'Sales', 'UX Design', 'Finance'];
const industryOptions = ['FinTech', 'SaaS', 'HealthTech', 'EdTech', 'CleanTech', 'D2C', 'Web3', 'AI', 'Logistics'];
const commitmentOptions = ['Full-time', 'Part-time', 'Founder-at-large'];

const savedSearches = [
    { id: '1', name: 'Tech Founders in BLR', icon: <HistoryIcon fontSize="small" /> },
    { id: '2', name: 'GTM Experts (5y+)', icon: <HistoryIcon fontSize="small" /> },
];

const FiltersPage = () => {
    const [filters, setFilters] = useState({
        location: '',
        minExp: 0,
        education: '',
        skills: [] as string[],
        domains: [] as string[],
        commitment: '',
        role: '',
    });

    const [activeSearchId, setActiveSearchId] = useState<string | null>(null);

    const toggleFilter = (key: 'skills' | 'domains', value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: prev[key].includes(value)
                ? prev[key].filter(i => i !== value)
                : [...prev[key], value]
        }));
    };

    const filteredFounders = useMemo(() => {
        return mockFounders.filter(f => {
            if (filters.location && !f.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
            if (filters.minExp > 0 && f.yearsOfExperience < filters.minExp) return false;
            if (filters.role && f.role !== filters.role) return false;
            if (filters.commitment && f.commitment !== filters.commitment) return false;
            if (filters.domains.length > 0 && !filters.domains.some(d => f.industries.includes(d))) return false;
            if (filters.skills.length > 0 && !filters.skills.some(s => f.skills.includes(s))) return false;
            return true;
        });
    }, [filters]);

    const recommendations = useMemo(() => {
        // Simple mock recommendations: founders with highest experience
        return [...mockFounders].sort((a, b) => b.yearsOfExperience - a.yearsOfExperience).slice(0, 3);
    }, []);

    const resetFilters = () => {
        setFilters({
            location: '',
            minExp: 0,
            education: '',
            skills: [],
            domains: [],
            commitment: '',
            role: '',
        });
        setActiveSearchId(null);
    };

    return (
        <div className="filters-page">
            <div className="fp-glow fp-glow-1" />

            <div className="fp-container">
                {/* Left Sidebar: Filters */}
                <aside className="fp-sidebar">
                    <div className="fp-card filters-panel">
                        <h2 className="fp-title">
                            <TuneIcon sx={{ color: 'var(--primary)' }} /> Filters
                        </h2>

                        {/* Search Preference */}
                        <div className="filter-group">
                            <p className="fp-section-title"><BusinessCenterIcon fontSize="inherit" /> Role Preference</p>
                            <select
                                className="fp-input"
                                value={filters.role}
                                onChange={e => setFilters({ ...filters, role: e.target.value })}
                            >
                                <option value="">Any Role</option>
                                <option value="Tech">Tech Founder</option>
                                <option value="Business">Business Founder</option>
                                <option value="Design">Design Founder</option>
                                <option value="Operations">Operations Founder</option>
                            </select>
                        </div>

                        {/* Education */}
                        <div className="filter-group">
                            <p className="fp-section-title"><SchoolIcon fontSize="inherit" /> Academic Background</p>
                            <select
                                className="fp-input"
                                value={filters.education}
                                onChange={e => setFilters({ ...filters, education: e.target.value })}
                            >
                                <option value="">Any Background</option>
                                <option value="Ivy League">Ivy League / Tier 1</option>
                                <option value="Masters">Master's Degree</option>
                                <option value="PhD">Research / PhD</option>
                                <option value="Self-taught">Self-taught / Alt-Ed</option>
                            </select>
                        </div>

                        {/* Location */}
                        <div className="filter-group">
                            <p className="fp-section-title"><LocationOnIcon fontSize="inherit" /> Geographic Focus</p>
                            <input
                                className="fp-input"
                                placeholder="Location (City, Remote...)"
                                value={filters.location}
                                onChange={e => setFilters({ ...filters, location: e.target.value })}
                            />
                        </div>

                        {/* Experience */}
                        <div className="filter-group">
                            <p className="fp-section-title"><AccessTimeIcon fontSize="inherit" /> Minimum Experience</p>
                            <div className="range-row">
                                <div className="range-labels">
                                    <span>{filters.minExp} Years</span>
                                    <span>20+</span>
                                </div>
                                <input
                                    type="range"
                                    className="range-input"
                                    min="0" max="20"
                                    value={filters.minExp}
                                    onChange={e => setFilters({ ...filters, minExp: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>

                        {/* Commitment */}
                        <div className="filter-group">
                            <p className="fp-section-title"><GroupIcon fontSize="inherit" /> Commitment</p>
                            <div className="toggle-group">
                                {commitmentOptions.map(opt => (
                                    <button
                                        key={opt}
                                        className={`toggle-btn ${filters.commitment === opt ? 'active' : ''}`}
                                        onClick={() => setFilters({ ...filters, commitment: opt === filters.commitment ? '' : opt })}
                                    >
                                        {opt.split('-')[0]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Domain Expertise */}
                        <div className="filter-group">
                            <p className="fp-section-title"><FactoryIcon fontSize="inherit" /> Domain Expertise</p>
                            <div className="chip-grid">
                                {industryOptions.map(ind => (
                                    <button
                                        key={ind}
                                        className={`chip ${filters.domains.includes(ind) ? 'active' : ''}`}
                                        onClick={() => toggleFilter('domains', ind)}
                                    >
                                        {ind}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="filter-group">
                            <p className="fp-section-title"><BoltIcon fontSize="inherit" /> Strategic Skills</p>
                            <div className="chip-grid">
                                {skillOptions.map(skill => (
                                    <button
                                        key={skill}
                                        className={`chip ${filters.skills.includes(skill) ? 'active' : ''}`}
                                        onClick={() => toggleFilter('skills', skill)}
                                    >
                                        {skill}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button className="apply-btn" onClick={resetFilters}>
                            Reset Discovery
                        </button>
                    </div>
                </aside>

                {/* Right Content: Top Bar + Grid */}
                <main className="fp-main">
                    {/* Top Bar: Saved Searches */}
                    <div className="fp-card fp-top-bar">
                        <div className="fp-saved-searches">
                            <p className="fp-section-title" style={{ marginBottom: 0 }}>
                                <BookmarkIcon fontSize="inherit" /> Saved Contexts
                            </p>
                            {savedSearches.map(s => (
                                <button
                                    key={s.id}
                                    className={`saved-search-chip ${activeSearchId === s.id ? 'active' : ''}`}
                                    onClick={() => setActiveSearchId(s.id)}
                                >
                                    {s.icon} {s.name}
                                </button>
                            ))}
                        </div>
                        <div className="fp-top-actions">
                            <button className="chip" onClick={resetFilters}>Clear All</button>
                        </div>
                    </div>

                    {/* Results Section */}
                    <section className="fp-results">
                        <div className="results-header">
                            <h3 className="results-count">
                                {filteredFounders.length} Potential Partners Found
                            </h3>
                            <div className="active-filters">
                                {filters.role && <div className="chip active">{filters.role}</div>}
                                {filters.minExp > 0 && <div className="chip active">{filters.minExp}y+ Exp</div>}
                            </div>
                        </div>

                        <div className="fp-grid">
                            <AnimatePresence mode="popLayout">
                                {filteredFounders.length > 0 ? (
                                    filteredFounders.map((founder, idx) => (
                                        <motion.div
                                            key={founder.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                                            style={{ position: 'relative', height: '540px' }}
                                        >
                                            <FounderCard founder={founder} isTop={false} />
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="no-results">
                                        <div className="no-results-icon"><SearchOffIcon fontSize="inherit" /></div>
                                        <h3>No Talent Matched</h3>
                                        <p>Loosen your filters to discover more founders matching your vision.</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </section>

                    {/* Recommendations Section */}
                    <section className="fp-recommendations">
                        <h3 className="fp-section-title" style={{ fontSize: '1rem', color: 'white', marginBottom: '2rem' }}>
                            <AutoFixHighIcon sx={{ color: 'var(--secondary)' }} /> Hyper-Relevant Recommendations
                        </h3>
                        <div className="fp-grid">
                            {recommendations.map(founder => (
                                <div key={`rec-${founder.id}`} style={{ position: 'relative', height: '540px' }}>
                                    <FounderCard founder={founder} isTop={false} />
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default FiltersPage;
