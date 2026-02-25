import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BoltIcon from '@mui/icons-material/Bolt';
import PersonIcon from '@mui/icons-material/Person';
import FM_logo from '../../assets/FM_logo.png';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
        { path: '/swipe', label: 'Discover', icon: <LocalFireDepartmentIcon /> },
        { path: '/matches', label: 'Matches', icon: <ChatBubbleIcon /> },
        { path: '/filters', label: 'Filters', icon: <BoltIcon /> },
        { path: '/profile', label: 'Profile', icon: <PersonIcon /> },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src={FM_logo} alt="Founder's Matrimony" className="logo-img" />
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
