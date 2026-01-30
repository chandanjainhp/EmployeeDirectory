import React from 'react';
import { motion } from 'motion/react';

/**
 * Animated Trash Icon (replaces 🗑️)
 * Lid lifts on hover
 */
const TrashIcon = ({ size = 24, color = 'currentColor', className = '', ...props }) => {
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
            {/* Lid */}
            <motion.path
                d="M3 6h18"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                variants={{
                    rest: { y: 0 },
                    hover: { y: -3 }
                }}
                transition={{ duration: 0.2 }}
            />

            {/* Handle */}
            <motion.path
                d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                variants={{
                    rest: { y: 0 },
                    hover: { y: -3 }
                }}
                transition={{ duration: 0.2 }}
            />

            {/* Can body */}
            <motion.path
                d="M19 6v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* Vertical lines */}
            <motion.line
                x1="10"
                y1="10"
                x2="10"
                y2="16"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
            <motion.line
                x1="14"
                y1="10"
                x2="14"
                y2="16"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </motion.svg>
    );
};

export default TrashIcon;
