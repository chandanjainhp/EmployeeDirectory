import React from 'react';
import { motion } from 'motion/react';

/**
 * Animated Mailbox Icon (replaces 📭)
 * Flag raises on hover
 */
const MailboxIcon = ({ size = 24, color = 'currentColor', className = '', ...props }) => {
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
            {/* Mailbox body */}
            <motion.rect
                x="4"
                y="8"
                width="12"
                height="10"
                rx="2"
                stroke={color}
                strokeWidth="2"
                fill="none"
            />

            {/* Mailbox door */}
            <motion.rect
                x="6"
                y="11"
                width="4"
                height="5"
                rx="0.5"
                stroke={color}
                strokeWidth="1.5"
                fill="none"
            />

            {/* Post */}
            <motion.line
                x1="16"
                y1="18"
                x2="16"
                y2="22"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* Flag */}
            <motion.path
                d="M16 8h4l-1 2 1 2h-4V8z"
                fill={color}
                variants={{
                    rest: { rotate: 0, y: 0 },
                    hover: { rotate: -20, y: -2 }
                }}
                style={{ originX: 0, originY: 0.5 }}
                transition={{ duration: 0.3 }}
            />
        </motion.svg>
    );
};

export default MailboxIcon;
