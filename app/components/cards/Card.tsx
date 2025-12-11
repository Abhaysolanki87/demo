'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className = '',
  interactive = false,
  onClick,
}: CardProps) {
  return (
    <motion.div
      whileHover={interactive ? { y: -4 } : {}}
      whileTap={interactive ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`
        relative overflow-hidden
        bg-white/10 dark:bg-white/5
        backdrop-blur-md
        border border-white/20 dark:border-white/10
        rounded-xl
        shadow-lg
        dark:shadow-black/20
        transition-all duration-300
        ${interactive ? 'cursor-pointer hover:bg-white/15 dark:hover:bg-white/10' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
