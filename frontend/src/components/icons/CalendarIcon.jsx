import React from 'react';
import { motion } from 'motion/react';

/**
 * Animated Calendar Icon (replaces 📅)
 * Calendar pages flip on hover
 */
const CalendarIcon = ({ size = 24, color = 'currentColor', className = '', ...props }) => {
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
            {/* Calendar body */}
            <motion.rect
                x="3"
                y="6"
                width="18"
                height="15"
                rx="2"
                stroke={color}
                strokeWidth="2"
                fill="none"
            />

            {/* Top bar */}
            <motion.line
                x1="3"
                y1="10"
                x2="21"
                y2="10"
                stroke={color}
                strokeWidth="2"
            />

            {/* Left hook */}
            <motion.line
                x1="7"
                y1="3"
                x2="7"
                y2="7"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                variants={{
                    rest: { y: 0 },
                    hover: { y: -2 }
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Right hook */}
            <motion.line
                x1="17"
                y1="3"
                x2="17"
                y2="7"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                variants={{
                    rest: { y: 0 },
                    hover: { y: -2 }
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Date dots */}
            <motion.circle
                cx="8"
                cy="14"
                r="1"
                fill={color}
                variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.3 }
                }}
                transition={{ duration: 0.2 }}
            />
            <motion.circle
                cx="12"
                cy="14"
                r="1"
                fill={color}
                variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.3 }
                }}
                transition={{ duration: 0.2, delay: 0.05 }}
            />
            <motion.circle
                cx="16"
                cy="14"
                r="1"
                fill={color}
                variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.3 }
                }}
                transition={{ duration: 0.2, delay: 0.1 }}
            />
        </motion.svg>
    );
};

export default CalendarIcon;
