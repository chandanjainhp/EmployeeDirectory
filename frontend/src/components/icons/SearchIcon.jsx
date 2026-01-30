import React from 'react';
import { motion } from 'motion/react';

/**
 * Animated Search Icon (replaces 🔍)
 * Magnifying glass zooms and rotates on hover
 */
const SearchIcon = ({ size = 24, color = 'currentColor', className = '', ...props }) => {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            initial="rest"
            whileHover="hover"
            animate="rest"
            {...props}
        >
            {/* Magnifying glass circle */}
            <motion.circle
                cx="11"
                cy="11"
                r="7"
                stroke={color}
                strokeWidth="2"
                fill="none"
                variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.1 }
                }}
                style={{ originX: 0.5, originY: 0.5 }}
                transition={{ duration: 0.3 }}
            />

            {/* Handle */}
            <motion.line
                x1="16.5"
                y1="16.5"
                x2="21"
                y2="21"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                variants={{
                    rest: { rotate: 0, scale: 1 },
                    hover: { rotate: -15, scale: 1.1 }
                }}
                style={{ originX: 0, originY: 0 }}
                transition={{ duration: 0.3 }}
            />

            {/* Inner sparkle */}
            <motion.circle
                cx="9"
                cy="9"
                r="1.5"
                fill={color}
                variants={{
                    rest: { scale: 0, opacity: 0 },
                    hover: { scale: 1, opacity: 0.5 }
                }}
                transition={{ duration: 0.2 }}
            />
        </motion.svg>
    );
};

export default SearchIcon;
