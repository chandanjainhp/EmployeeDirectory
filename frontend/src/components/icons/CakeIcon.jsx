import React from 'react';
import { motion } from 'motion/react';

/**
 * Animated Cake Icon (replaces 🎂)
 * Candle flame flickers on hover
 */
const CakeIcon = ({ size = 24, color = 'currentColor', className = '', ...props }) => {
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
            {/* Cake base */}
            <motion.path
                d="M4 12h16v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7z"
                stroke={color}
                strokeWidth="2"
                fill="none"
            />

            {/* Cake middle layer */}
            <motion.path
                d="M3 12h18v0a1 1 0 01-1 1H4a1 1 0 01-1-1v0z"
                stroke={color}
                strokeWidth="2"
                fill="none"
            />

            {/* Candle */}
            <motion.rect
                x="11"
                y="6"
                width="2"
                height="6"
                rx="0.5"
                fill={color}
            />

            {/* Flame */}
            <motion.path
                d="M12 3c0 0 1.5 1 1.5 2s-0.5 1.5-1.5 1.5-1.5-0.5-1.5-1.5 1.5-2 1.5-2z"
                fill={color}
                variants={{
                    rest: { scale: 1, y: 0 },
                    hover: {
                        scale: [1, 1.2, 1, 1.1, 1],
                        y: [0, -1, 0, -0.5, 0]
                    }
                }}
                style={{ originX: 0.5, originY: 1 }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "loop"
                }}
            />

            {/* Frosting decoration */}
            <motion.circle
                cx="8"
                cy="16"
                r="1"
                fill={color}
                variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.2 }
                }}
            />
            <motion.circle
                cx="12"
                cy="16"
                r="1"
                fill={color}
                variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.2 }
                }}
                transition={{ delay: 0.05 }}
            />
            <motion.circle
                cx="16"
                cy="16"
                r="1"
                fill={color}
                variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.2 }
                }}
                transition={{ delay: 0.1 }}
            />
        </motion.svg>
    );
};

export default CakeIcon;
