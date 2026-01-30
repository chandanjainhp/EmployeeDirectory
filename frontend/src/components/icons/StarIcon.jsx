import React from 'react';
import { motion } from 'motion/react';

/**
 * Animated Star Icon (replaces 🌟)
 * Star sparkles and rotates on hover
 */
const StarIcon = ({ size = 24, color = 'currentColor', className = '', ...props }) => {
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
            {/* Main star */}
            <motion.path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                stroke={color}
                strokeWidth="2"
                fill="none"
                strokeLinejoin="round"
                variants={{
                    rest: { rotate: 0, scale: 1 },
                    hover: { rotate: 15, scale: 1.1 }
                }}
                style={{ originX: 0.5, originY: 0.5 }}
                transition={{ duration: 0.3 }}
            />

            {/* Sparkle 1 */}
            <motion.path
                d="M6 6l0.5 1.5L8 8l-1.5 0.5L6 10l-0.5-1.5L4 8l1.5-0.5L6 6z"
                fill={color}
                variants={{
                    rest: { scale: 0, opacity: 0 },
                    hover: { scale: 1, opacity: 1 }
                }}
                transition={{ duration: 0.2 }}
            />

            {/* Sparkle 2 */}
            <motion.path
                d="M18 4l0.5 1.5L20 6l-1.5 0.5L18 8l-0.5-1.5L16 6l1.5-0.5L18 4z"
                fill={color}
                variants={{
                    rest: { scale: 0, opacity: 0 },
                    hover: { scale: 1, opacity: 1 }
                }}
                transition={{ duration: 0.2, delay: 0.1 }}
            />

            {/* Sparkle 3 */}
            <motion.path
                d="M20 16l0.5 1.5L22 18l-1.5 0.5L20 20l-0.5-1.5L18 18l1.5-0.5L20 16z"
                fill={color}
                variants={{
                    rest: { scale: 0, opacity: 0 },
                    hover: { scale: 1, opacity: 1 }
                }}
                transition={{ duration: 0.2, delay: 0.15 }}
            />
        </motion.svg>
    );
};

export default StarIcon;
