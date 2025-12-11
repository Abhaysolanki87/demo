'use client';

import React from 'react';

interface DividerProps {
  text?: string;
  className?: string;
}

export function Divider({ text, className = '' }: DividerProps) {
  if (!text) {
    return (
      <div className={`h-px bg-gray-200 dark:bg-gray-700 ${className}`} />
    );
  }

  return (
    <div
      className={`flex items-center gap-4 ${className}`}
    >
      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
        {text}
      </span>
      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}
