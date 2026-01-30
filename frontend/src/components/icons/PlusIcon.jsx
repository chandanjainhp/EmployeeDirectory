import React from 'react';
import { motion } from 'motion/react';

/**
 * Animated Plus Icon (replaces ➕)
 * Plus rotates and expands on hover
 */
const PlusIcon = ({ size = 24, color = 'currentColor', className = '', ...props }) => {
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
            {/* Horizontal line */}
            <motion.line
                x1="5"
                y1="12"
                x2="19"
                y2="12"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                variants={{
                    rest: { scaleX: 1, rotate: 0 },
                    hover: { scaleX: 1.1, rotate: 90 }
                }}
                style={{ originX: 0.5, originY: 0.5 }}
                transition={{ duration: 0.3 }}
            />

            {/* Vertical line */}
            <motion.line
                x1="12"
                y1="5"
                x2="12"
                y2="19"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                variants={{
                    rest: { scaleY: 1, rotate: 0 },
                    hover: { scaleY: 1.1, rotate: 90 }
                }}
                style={{ originX: 0.5, originY: 0.5 }}
                transition={{ duration: 0.3 }}
            />
        </motion.svg>
    );
};

export default PlusIcon;
