import React from 'react';
import { motion } from 'motion/react';

/**
 * Animated Users Icon (replaces 👥)
 * Shows multiple user silhouettes with hover animation
 */
const UsersIcon = ({ size = 24, color = 'currentColor', className = '', ...props }) => {
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
            {/* First user */}
            <motion.circle
                cx="9"
                cy="7"
                r="3"
                stroke={color}
                strokeWidth="2"
                fill="none"
                variants={{
                    rest: { scale: 1, x: 0 },
                    hover: { scale: 1.1, x: -1 }
                }}
                transition={{ duration: 0.3 }}
            />
            <motion.path
                d="M3 20c0-3.314 2.686-6 6-6s6 2.686 6 6"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                variants={{
                    rest: { x: 0 },
                    hover: { x: -1 }
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Second user */}
            <motion.circle
                cx="16"
                cy="7"
                r="3"
                stroke={color}
                strokeWidth="2"
                fill="none"
                variants={{
                    rest: { scale: 1, x: 0 },
                    hover: { scale: 1.1, x: 1 }
                }}
                transition={{ duration: 0.3 }}
            />
            <motion.path
                d="M10 20c0-3.314 2.686-6 6-6s6 2.686 6 6"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                variants={{
                    rest: { x: 0 },
                    hover: { x: 1 }
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.svg>
    );
};

export default UsersIcon;
