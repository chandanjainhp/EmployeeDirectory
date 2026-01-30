import React from 'react';
import { motion } from 'motion/react';

/**
 * Animated Chart Icon (replaces 📊)
 * Bars animate up on hover
 */
const ChartIcon = ({ size = 24, color = 'currentColor', className = '', ...props }) => {
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
            {/* Bar 1 - Short */}
            <motion.rect
                x="4"
                y="14"
                width="4"
                height="7"
                rx="1"
                fill={color}
                variants={{
                    rest: { scaleY: 1, y: 0 },
                    hover: { scaleY: 1.2, y: -2 }
                }}
                style={{ originY: 1 }}
                transition={{ duration: 0.3 }}
            />

            {/* Bar 2 - Medium */}
            <motion.rect
                x="10"
                y="10"
                width="4"
                height="11"
                rx="1"
                fill={color}
                variants={{
                    rest: { scaleY: 1, y: 0 },
                    hover: { scaleY: 1.15, y: -1 }
                }}
                style={{ originY: 1 }}
                transition={{ duration: 0.3, delay: 0.05 }}
            />

            {/* Bar 3 - Tall */}
            <motion.rect
                x="16"
                y="6"
                width="4"
                height="15"
                rx="1"
                fill={color}
                variants={{
                    rest: { scaleY: 1, y: 0 },
                    hover: { scaleY: 1.1, y: -0.5 }
                }}
                style={{ originY: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            />

            {/* Base line */}
            <motion.line
                x1="2"
                y1="21"
                x2="22"
                y2="21"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </motion.svg>
    );
};

export default ChartIcon;
