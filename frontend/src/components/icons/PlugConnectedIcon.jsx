import React from 'react';
import { motion } from 'motion/react';

/**
 * Animated Plug Connected Icon
 * Inspired by itshover.com - motion-first animated icon
 * Animates on hover with smooth transitions
 */
const PlugConnectedIcon = ({
    size = 24,
    color = 'currentColor',
    className = '',
    ...props
}) => {
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
            {/* Left plug prong */}
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
                transition={{ duration: 0.3, ease: "easeOut" }}
            />

            {/* Right plug prong */}
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
                transition={{ duration: 0.3, ease: "easeOut" }}
            />

            {/* Plug body */}
            <motion.rect
                x="5"
                y="7"
                width="14"
                height="6"
                rx="1"
                stroke={color}
                strokeWidth="2"
                fill="none"
                variants={{
                    rest: { y: 0 },
                    hover: { y: -2 }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />

            {/* Connection line */}
            <motion.path
                d="M12 13 L12 17"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                variants={{
                    rest: { pathLength: 1, opacity: 1 },
                    hover: { pathLength: 0.7, opacity: 0.7 }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />

            {/* Socket */}
            <motion.rect
                x="8"
                y="17"
                width="8"
                height="4"
                rx="1"
                stroke={color}
                strokeWidth="2"
                fill="none"
                variants={{
                    rest: { y: 0, scale: 1 },
                    hover: { y: 2, scale: 1.05 }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />

            {/* Energy spark effect */}
            <motion.circle
                cx="12"
                cy="15"
                r="2"
                fill={color}
                variants={{
                    rest: { scale: 0, opacity: 0 },
                    hover: {
                        scale: [0, 1.2, 0],
                        opacity: [0, 0.6, 0]
                    }
                }}
                transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0.2
                }}
            />
        </motion.svg>
    );
};

export default PlugConnectedIcon;
