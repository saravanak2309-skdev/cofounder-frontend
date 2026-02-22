import { motion } from 'framer-motion';
import './SwipeControls.css';

interface SwipeControlsProps {
    onPass: () => void;
    onConnect: () => void;
}

const SwipeControls = ({ onPass, onConnect }: SwipeControlsProps) => {
    return (
        <div className="swipe-controls">
            <motion.button
                className="control-btn pass-btn"
                onClick={onPass}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                title="Pass"
            >
                <span className="btn-icon">✕</span>
                <span className="btn-label">Pass</span>
            </motion.button>

            <motion.button
                className="control-btn connect-btn"
                onClick={onConnect}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                title="Connect"
            >
                <span className="btn-icon">🤝</span>
                <span className="btn-label">Connect</span>
            </motion.button>
        </div>
    );
};

export default SwipeControls;
