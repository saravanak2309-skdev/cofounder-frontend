import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FM_logo from '../../assets/FM_logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Discovery', path: '/swipe', icon: <TravelExploreIcon /> },
        { name: 'Matches', path: '/matches', icon: <ChatBubbleOutlineIcon /> },
        { name: 'Profile', path: '/profile', icon: <PersonOutlineIcon /> },
    ];

    return (
        <nav className="navbar-glass">
            <div className="nav-container">
                {/* LOGO SECTION - Properly aligned and balanced */}
                <Link to="/" className="nav-logo-group">
                    <img src={FM_logo} alt="Founder Matrimony" className="nav-logo-img" />
                    <div className="nav-logo-text">
                        <span className="logo-top">FOUNDER</span>
                        <span className="logo-bottom">MATRIMONY</span>
                    </div>
                </Link>

                {/* DESKTOP NAV */}
                <div className="nav-desktop">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                        >
                            <span className="nav-link-icon">{link.icon}</span>
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/create-profile" className="btn-premium btn-premium-primary nav-cta">
                        Start Building
                    </Link>
                </div>

                {/* MOBILE TOGGLE */}
                <button className="nav-mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="mobile-menu-overlay"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="mobile-menu-link"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.icon} {link.name}
                            </Link>
                        ))}
                        <Link to="/create-profile" className="btn-premium btn-premium-primary" onClick={() => setIsOpen(false)}>
                            Start Building
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
