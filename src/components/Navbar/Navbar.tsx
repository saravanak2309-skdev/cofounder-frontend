import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
        { path: '/swipe', label: 'Discover', icon: '🔥' },
        { path: '/matches', label: 'Matches', icon: '💬' },
        { path: '/filters', label: 'Filters', icon: '⚡' },
        { path: '/profile', label: 'Profile', icon: '👤' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">💼</span>
                    <span className="logo-text">Founder's Matrimony</span>
                </Link>

                <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
                    <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
                    <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
                </button>

                <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                        </Link>
                    ))}
                    <Link to="/create-profile" className="nav-cta" onClick={() => setMenuOpen(false)}>
                        + Build Profile
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
