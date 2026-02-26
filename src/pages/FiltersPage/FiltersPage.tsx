import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TuneIcon from '@mui/icons-material/Tune';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PsychologyIcon from '@mui/icons-material/Psychology';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import StarsIcon from '@mui/icons-material/Stars';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import VerifiedIcon from '@mui/icons-material/Verified';
import { mockFounders } from '../../data/mockFounders';
import FounderCard from '../../components/FounderCard/FounderCard';
import './FiltersPage.css';

const FiltersPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState(['Remote', 'Tech', '5+ Years']);

    const removeFilter = (filter: string) => {
        setActiveFilters(activeFilters.filter(f => f !== filter));
    };

    return (
        <div className="discovery-filters-page">
            <div className="filters-layout">
                {/* ── LEFT SIDEBAR: FILTERS ── */}
                <aside className="filters-sidebar glass">
                    <div className="sidebar-section">
                        <div className="section-header">
                            <TuneIcon fontSize="small" />
                            <h3>Discovery Protocol</h3>
                        </div>

                        <div className="filter-group">
                            <label>Geographic Base</label>
                            <input type="text" placeholder="e.g. Bangalore, Remote" />
                        </div>

                        <div className="filter-group">
                            <label>Executive Tenure</label>
                            <select>
                                <option>Any Experience</option>
                                <option>2-5 Years</option>
                                <option>5-10 Years</option>
                                <option>10+ Years</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Academic Pedigree</label>
                            <select>
                                <option>All Institutions</option>
                                <option>Tier-1 (IIT/IIM/Stanford)</option>
                                <option>Ivy League</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Primary Role Gap</label>
                            <div className="role-grid">
                                {['Tech', 'Business', 'Design', 'Ops'].map(role => (
                                    <button key={role} className={`role-pill ${role === 'Tech' ? 'active' : ''}`}>
                                        {role}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="filter-group">
                            <label>Venture Commitment</label>
                            <div className="checkbox-list">
                                <label className="check-item">
                                    <input type="checkbox" defaultChecked /> Full-time
                                </label>
                                <label className="check-item">
                                    <input type="checkbox" /> Part-time / Advisory
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="sidebar-section saved-contexts">
                        <div className="section-header">
                            <BookmarkBorderIcon fontSize="small" />
                            <h3>Saved Contexts</h3>
                        </div>
                        <div className="saved-item">Tech Cofounder / Web3</div>
                        <div className="saved-item">GTM Expert / Fintech</div>
                    </div>

                    <button className="btn-premium btn-premium-primary full-width">
                        APPLY PARAMETERS
                    </button>
                </aside>

                {/* ── MAIN AREA: RESULTS ── */}
                <main className="results-container">
                    <header className="results-header">
                        <div className="search-bar-wrap glass">
                            <SearchIcon className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search by skills, domain, or vision keywords..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="active-filters-row">
                            {activeFilters.map(f => (
                                <span key={f} className="active-filter-pill">
                                    {f} <CloseIcon onClick={() => removeFilter(f)} fontSize="inherit" />
                                </span>
                            ))}
                            {activeFilters.length > 0 && <button className="clear-all">Clear All</button>}
                        </div>
                    </header>

                    <section className="results-grid-area">
                        <div className="results-meta">
                            <h2>Strategic Matches <span className="count">24 Founders</span></h2>
                        </div>

                        <div className="founders-grid">
                            {mockFounders.map(founder => (
                                <div key={founder.id} className="grid-card-wrap">
                                    <FounderCard founder={founder} />
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                {/* ── RIGHT SIDEBAR: RECOMMENDATIONS ── */}
                <aside className="recommendations-sidebar glass">
                    <div className="section-header">
                        <AutoFixHighIcon fontSize="small" className="ai-icon" />
                        <h3>AI Recommendations</h3>
                    </div>
                    <p className="ai-hint">Based on your venture vision and expertise gaps.</p>

                    <div className="rec-list">
                        <div className="rec-item glass">
                            <div className="rec-avatar">VK</div>
                            <div className="rec-info">
                                <h4>Vikram S.</h4>
                                <p>Ex-BrowserStack • 96% Match</p>
                            </div>
                        </div>
                        <div className="rec-item glass">
                            <div className="rec-avatar">SK</div>
                            <div className="rec-info">
                                <h4>Sanya K.</h4>
                                <p>Product @ Razorpay • 92% Match</p>
                            </div>
                        </div>
                    </div>

                    <div className="discovery-stats glass">
                        <div className="stat-node">
                            <span>128</span>
                            <label>In Pipeline</label>
                        </div>
                        <div className="stat-node">
                            <span>14</span>
                            <label>High Synergy</label>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default FiltersPage;
