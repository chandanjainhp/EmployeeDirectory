import React from 'react';
import { motion } from 'motion/react';

/**
 * Animated Trophy Icon (replaces 🏆)
 * Trophy lifts and sparkles on hover
 */
const TrophyIcon = ({ size = 24, color = 'currentColor', className = '', ...props }) => {
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
            {/* Trophy cup */}
            <motion.path
                d="M8 3h8v6c0 2.21-1.79 4-4 4s-4-1.79-4-4V3z"
                stroke={color}
                strokeWidth="2"
                fill="none"
                variants={{
                    rest: { y: 0 },
                    hover: { y: -2 }
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Left handle */}
            <motion.path
                d="M8 5H6a2 2 0 00-2 2v1a2 2 0 002 2h2"
                stroke={color}
                strokeWidth="2"
                fill="none"
                variants={{
                    rest: { y: 0 },
                    hover: { y: -2 }
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Right handle */}
            <motion.path
                d="M16 5h2a2 2 0 012 2v1a2 2 0 01-2 2h-2"
                stroke={color}
                strokeWidth="2"
                fill="none"
                variants={{
                    rest: { y: 0 },
                    hover: { y: -2 }
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Base stem */}
            <motion.line
                x1="12"
                y1="13"
                x2="12"
                y2="18"
                stroke={color}
                strokeWidth="2"
                variants={{
                    rest: { y: 0 },
                    hover: { y: -2 }
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Base */}
            <motion.rect
                x="9"
                y="18"
                width="6"
                height="3"
                rx="0.5"
                stroke={color}
                strokeWidth="2"
                fill="none"
                variants={{
                    rest: { y: 0 },
                    hover: { y: -2 }
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Sparkle */}
            <motion.circle
                cx="6"
                cy="6"
                r="1.5"
                fill={color}
                variants={{
                    rest: { scale: 0, opacity: 0 },
                    hover: { scale: 1, opacity: 1 }
                }}
                transition={{ duration: 0.2 }}
            />
        </motion.svg>
    );
};

export default TrophyIcon;
