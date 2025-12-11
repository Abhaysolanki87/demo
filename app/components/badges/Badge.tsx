'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100',
  success: 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400',
  warning: 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
  error: 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400',
  info: 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

export function Badge({
  variant = 'default',
  size = 'md',
  children,
  icon,
}: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`
        inline-flex items-center gap-1.5
        font-semibold rounded-full
        ${variantClasses[variant]}
        ${sizeClasses[size]}
      `}
    >
      {icon}
      {children}
    </motion.div>
  );
}

export function SharingBadge({
  isPublic,
  size = 'md',
}: {
  isPublic: boolean;
  size?: BadgeSize;
}) {
  return (
    <Badge
      variant={isPublic ? 'info' : 'default'}
      size={size}
    >
      {isPublic ? '🔗 Public' : '🔒 Private'}
    </Badge>
  );
}

export function StatusBadge({
  status,
  size = 'md',
}: {
  status: 'uploading' | 'completed' | 'error';
  size?: BadgeSize;
}) {
  const config = {
    uploading: { variant: 'info' as const, text: '⏳ Uploading' },
    completed: { variant: 'success' as const, text: '✓ Completed' },
    error: { variant: 'error' as const, text: '✕ Error' },
  };

  return (
    <Badge variant={config[status].variant} size={size}>
      {config[status].text}
    </Badge>
  );
}
