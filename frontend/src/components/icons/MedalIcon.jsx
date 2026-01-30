import React from 'react';
import { motion } from 'motion/react';

/**
 * Animated Medal Icon (replaces 🥇🥈🥉)
 * Medal swings on hover
 */
const MedalIcon = ({ size = 24, color = 'currentColor', rank = 1, className = '', ...props }) => {
    const colors = {
        1: '#FFD700', // Gold
        2: '#C0C0C0', // Silver
        3: '#CD7F32'  // Bronze
    };

    const medalColor = colors[rank] || color;

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
            {/* Ribbon left */}
            <motion.path
                d="M8 2L10 12"
                stroke={medalColor}
                strokeWidth="2"
                strokeLinecap="round"
                variants={{
                    rest: { rotate: 0 },
                    hover: { rotate: -5 }
                }}
                style={{ originX: 0.5, originY: 0 }}
                transition={{ duration: 0.3 }}
            />

            {/* Ribbon right */}
            <motion.path
                d="M16 2L14 12"
                stroke={medalColor}
                strokeWidth="2"
                strokeLinecap="round"
                variants={{
                    rest: { rotate: 0 },
                    hover: { rotate: 5 }
                }}
                style={{ originX: 0.5, originY: 0 }}
                transition={{ duration: 0.3 }}
            />

            {/* Medal circle */}
            <motion.circle
                cx="12"
                cy="16"
                r="6"
                fill={medalColor}
                stroke={medalColor}
                strokeWidth="2"
                variants={{
                    rest: { rotate: 0, scale: 1 },
                    hover: { rotate: 10, scale: 1.1 }
                }}
                style={{ originX: 0.5, originY: 0.5 }}
                transition={{ duration: 0.3 }}
            />

            {/* Rank number */}
            <motion.text
                x="12"
                y="18"
                textAnchor="middle"
                fontSize="8"
                fontWeight="bold"
                fill="#FFFFFF"
                variants={{
                    rest: { rotate: 0 },
                    hover: { rotate: 10 }
                }}
                style={{ originX: 0.5, originY: 0.5 }}
                transition={{ duration: 0.3 }}
            >
                {rank}
            </motion.text>
        </motion.svg>
    );
};

export default MedalIcon;
