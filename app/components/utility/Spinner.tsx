'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 48,
};

export function Spinner({ size = 'md', color = 'currentColor' }: SpinnerProps) {
  const dimension = sizeMap[size];

  return (
    <motion.svg
      width={dimension}
      height={dimension}
      viewBox="0 0 50 50"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="inline-block"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeOpacity="0.25"
      />
      <path
        d="M25 5 A 20 20 0 0 1 45 25"
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

export function LoadingDots({
  color = 'currentColor',
}: {
  color?: string;
}) {
  const dotVariants = {
    animate: {
      y: [0, -8, 0],
    },
  };

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          variants={dotVariants}
          animate="animate"
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
          }}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
