'use client';

import React, { ComponentPropsWithRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

type MotionInputProps = ComponentPropsWithRef<typeof motion.input>;

export function TextInput({
  label,
  error,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-3.5 text-gray-500 dark:text-gray-400">
            {icon}
          </div>
        )}
        <motion.input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          animate={{
            borderColor: isFocused ? '#3b82f6' : error ? '#ef4444' : '#e5e7eb',
          }}
          className={`
            w-full px-4 py-2.5
            ${icon && iconPosition === 'left' ? 'pl-10' : ''}
            ${icon && iconPosition === 'right' ? 'pr-10' : ''}
            border-2 rounded-lg
            bg-white dark:bg-gray-900
            text-black dark:text-white
            placeholder-gray-500 dark:placeholder-gray-400
            transition-all duration-200
            focus:outline-none
            ${error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700'}
            ${className}
          `}
          {...(props as MotionInputProps)}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-3.5 text-gray-500 dark:text-gray-400">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-500 dark:text-red-400 mt-1"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}
