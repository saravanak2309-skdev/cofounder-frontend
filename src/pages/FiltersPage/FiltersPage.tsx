import { useState } from 'react';
import { motion } from 'framer-motion';
import FounderCard from '../../components/FounderCard/FounderCard';
import SkillBadge from '../../components/SkillBadge/SkillBadge';
import { mockFounders } from '../../data/mockFounders';
import './FiltersPage.css';

const skillOptions = ['React', 'Node.js', 'Python', 'Machine Learning', 'Figma', 'Product Management', 'Sales', 'Growth Hacking', 'Finance', 'Operations'];
const industryOptions = ['FinTech', 'EdTech', 'HealthTech', 'SaaS', 'E-Commerce', 'AgriTech', 'D2C', 'Logistics', 'AI/ML', 'CleanTech'];

const FiltersPage = () => {
    const [filters, setFilters] = useState({
        location: '',
        minExperience: 0,
        maxExperience: 20,
        education: '',
        skills: [] as string[],
        industries: [] as string[],
        commitment: '',
        role: '',
        startupStage: '',
    });
    const [savedFilters, setSavedFilters] = useState(false);

    const toggleItem = (key: 'skills' | 'industries', value: string) => {
        setFilters(f => ({
            ...f,
            [key]: f[key].includes(value) ? f[key].filter(v => v !== value) : [...f[key], value],
        }));
    };

    const filteredFounders = mockFounders.filter(f => {
        if (filters.commitment && f.commitment !== filters.commitment) return false;
        if (filters.role && f.role !== filters.role) return false;
        if (filters.minExperience && f.yearsOfExperience < filters.minExperience) return false;
        if (filters.maxExperience && f.yearsOfExperience > filters.maxExperience) return false;
        if (filters.location && !f.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
        if (filters.industries.length > 0 && !filters.industries.some(ind => f.industries.includes(ind))) return false;
        if (filters.skills.length > 0 && !filters.skills.some(sk => f.skills.includes(sk))) return false;
        return true;
    });

    return (
        <div className="filters-page">
            <div className="filters-layout">
                {/* Filters Panel */}
                <aside className="filters-panel">
                    <div className="filters-header">
                        <h2 className="filters-title">⚡ Advanced Filters</h2>
                        <button className="clear-btn" onClick={() => setFilters({
                            location: '', minExperience: 0, maxExperience: 20,
                            education: '', skills: [], industries: [], commitment: '', role: '', startupStage: '',
                        })}>
                            Clear All
                        </button>
                    </div>

                    {/* Location */}
                    <div className="filter-group">
                        <label className="filter-label">📍 Location</label>
                        <input
                            className="filter-input"
                            placeholder="e.g. Bangalore, Mumbai..."
                            value={filters.location}
                            onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
                        />
                    </div>

                    {/* Experience Range */}
                    <div className="filter-group">
                        <label className="filter-label">⏱️ Experience Range</label>
                        <div className="range-labels">
                            <span>{filters.minExperience} yrs</span>
                            <span>{filters.maxExperience}+ yrs</span>
                        </div>
                        <div className="range-row">
                            <input type="range" min="0" max="20" className="range-input"
                                value={filters.minExperience}
                                onChange={e => setFilters(f => ({ ...f, minExperience: +e.target.value }))} />
                            <input type="range" min="0" max="30" className="range-input"
                                value={filters.maxExperience}
                                onChange={e => setFilters(f => ({ ...f, maxExperience: +e.target.value }))} />
                        </div>
                    </div>

                    {/* Commitment */}
                    <div className="filter-group">
                        <label className="filter-label">🕐 Commitment</label>
                        <div className="toggle-group">
                            {['', 'Full-time', 'Part-time'].map(c => (
                                <button key={c}
                                    className={`toggle-btn ${filters.commitment === c ? 'active' : ''}`}
                                    onClick={() => setFilters(f => ({ ...f, commitment: c }))}>
                                    {c || 'All'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Role */}
                    <div className="filter-group">
                        <label className="filter-label">👤 Role</label>
                        <select className="filter-input" value={filters.role}
                            onChange={e => setFilters(f => ({ ...f, role: e.target.value }))}>
                            <option value="">All Roles</option>
                            <option>Tech</option><option>Business</option>
                            <option>Design</option><option>Operations</option><option>Other</option>
                        </select>
                    </div>

                    {/* Startup Stage */}
                    <div className="filter-group">
                        <label className="filter-label">🚀 Startup Stage</label>
                        <select className="filter-input" value={filters.startupStage}
                            onChange={e => setFilters(f => ({ ...f, startupStage: e.target.value }))}>
                            <option value="">All Stages</option>
                            <option>Idea</option><option>MVP</option>
                            <option>Early Revenue</option><option>Growth</option><option>Scale</option>
                        </select>
                    </div>

                    {/* Skills */}
                    <div className="filter-group">
                        <label className="filter-label">⚡ Skills</label>
                        <div className="chip-grid">
                            {skillOptions.map(skill => (
                                <button key={skill}
                                    className={`chip ${filters.skills.includes(skill) ? 'active' : ''}`}
                                    onClick={() => toggleItem('skills', skill)}>
                                    {skill}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Industries */}
                    <div className="filter-group">
                        <label className="filter-label">🏭 Domain</label>
                        <div className="chip-grid">
                            {industryOptions.map(ind => (
                                <button key={ind}
                                    className={`chip ${filters.industries.includes(ind) ? 'active' : ''}`}
                                    onClick={() => toggleItem('industries', ind)}>
                                    {ind}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Save filters */}
                    <motion.button
                        className="save-filters-btn"
                        onClick={() => setSavedFilters(true)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {savedFilters ? '✓ Filters Saved' : '💾 Save Filters'}
                    </motion.button>
                </aside>

                {/* Results Panel */}
                <main className="results-panel">
                    <div className="results-header">
                        <h3 className="results-count">
                            {filteredFounders.length} founders found
                        </h3>
                        <div className="active-filters">
                            {filters.commitment && <SkillBadge label={filters.commitment} variant="domain" />}
                            {filters.role && <SkillBadge label={filters.role} variant="skill" />}
                            {filters.skills.map(s => <SkillBadge key={s} label={s} variant="skill" />)}
                            {filters.industries.map(i => <SkillBadge key={i} label={i} variant="domain" />)}
                        </div>
                    </div>

                    {/* Recommended section */}
                    <div className="section-label-text">⭐ Recommended for You</div>
                    <div className="results-grid">
                        {filteredFounders.length > 0 ? (
                            filteredFounders.map((founder, i) => (
                                <motion.div
                                    key={founder.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                >
                                    <FounderCard founder={founder} isTop={false} />
                                </motion.div>
                            ))
                        ) : (
                            <div className="no-results">
                                <div className="no-results-icon">🔍</div>
                                <h3>No matches found</h3>
                                <p>Try adjusting your filters to see more founders.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FiltersPage;
