import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import BoltIcon from '@mui/icons-material/Bolt';
import './SwipeControls.css';

interface SwipeControlsProps {
    onPass: () => void;
    onConnect: () => void;
}

const SwipeControls = ({ onPass, onConnect }: SwipeControlsProps) => {
    return (
        <div className="sc-container">
            <motion.button
                className="sc-btn sc-btn-pass"
                onClick={onPass}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Pass"
            >
                <div className="sc-icon-glow" />
                <CloseIcon />
            </motion.button>

            <motion.button
                className="sc-btn sc-btn-connect"
                onClick={onConnect}
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Connect"
            >
                <div className="sc-icon-glow" />
                <BoltIcon fontSize="large" />
                <span className="sc-btn-label">CONNECT</span>
            </motion.button>
        </div>
    );
};

export default SwipeControls;
