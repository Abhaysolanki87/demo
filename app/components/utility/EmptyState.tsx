'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../buttons/Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  icon = '📭',
  title,
  message,
  action,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      {typeof icon === 'string' ? (
        <div className="text-5xl mb-4">{icon}</div>
      ) : (
        <div className="mb-4 text-blue-500">{icon}</div>
      )}

      <h3 className="text-xl font-bold text-black dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
        {message}
      </p>

      {action && (
        <Button variant="primary" size="md" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </motion.div>
  );
}
