import React from 'react';
import { motion } from 'motion/react';

/**
 * Animated Building Icon (replaces 🏢)
 * Building grows taller on hover
 */
const BuildingIcon = ({ size = 24, color = 'currentColor', className = '', ...props }) => {
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
            {/* Building body */}
            <motion.rect
                x="4"
                y="4"
                width="16"
                height="17"
                rx="1"
                stroke={color}
                strokeWidth="2"
                fill="none"
                variants={{
                    rest: { scaleY: 1 },
                    hover: { scaleY: 1.05 }
                }}
                style={{ originY: 1 }}
                transition={{ duration: 0.3 }}
            />

            {/* Windows row 1 */}
            <motion.rect x="7" y="7" width="2" height="2" fill={color} variants={{ rest: { opacity: 0.7 }, hover: { opacity: 1 } }} />
            <motion.rect x="11" y="7" width="2" height="2" fill={color} variants={{ rest: { opacity: 0.7 }, hover: { opacity: 1 } }} />
            <motion.rect x="15" y="7" width="2" height="2" fill={color} variants={{ rest: { opacity: 0.7 }, hover: { opacity: 1 } }} />

            {/* Windows row 2 */}
            <motion.rect x="7" y="11" width="2" height="2" fill={color} variants={{ rest: { opacity: 0.7 }, hover: { opacity: 1 } }} />
            <motion.rect x="11" y="11" width="2" height="2" fill={color} variants={{ rest: { opacity: 0.7 }, hover: { opacity: 1 } }} />
            <motion.rect x="15" y="11" width="2" height="2" fill={color} variants={{ rest: { opacity: 0.7 }, hover: { opacity: 1 } }} />

            {/* Door */}
            <motion.rect
                x="10"
                y="16"
                width="4"
                height="5"
                fill={color}
                variants={{
                    rest: { scaleY: 1 },
                    hover: { scaleY: 1.1 }
                }}
                style={{ originY: 1 }}
            />
        </motion.svg>
    );
};

export default BuildingIcon;
