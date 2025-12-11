'use client';

import React, { ComponentPropsWithRef } from 'react';
import { motion } from 'framer-motion';

export type ButtonVariant = 'primary' | 'secondary' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  isLoading?: boolean;
}

type MotionButtonProps = ComponentPropsWithRef<typeof motion.button>;

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    relative overflow-hidden
    bg-gradient-to-r from-blue-500 to-cyan-500
    text-white font-semibold rounded-lg
    shadow-lg shadow-blue-500/50
    hover:shadow-xl hover:shadow-blue-400/75
    dark:shadow-blue-900/50 dark:hover:shadow-blue-700/75
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-300
  `,
  secondary: `
    relative overflow-hidden
    border-2 border-white/30
    dark:border-white/20
    bg-white/10 backdrop-blur-md
    text-black dark:text-white
    font-semibold rounded-lg
    hover:bg-white/20 dark:hover:bg-white/15
    hover:border-white/50 dark:hover:border-white/40
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-300
  `,
  icon: `
    relative overflow-hidden
    p-2.5 rounded-full
    bg-white/10 backdrop-blur-md
    text-black dark:text-white
    hover:bg-white/20 dark:hover:bg-white/15
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-300
  `,
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = variantClasses[variant];
  const sizeClass = variant !== 'icon' ? sizeClasses[size] : '';
  const disabledState = disabled || isLoading;

  return (
    <motion.button
      whileHover={{ scale: disabledState ? 1 : 1.02 }}
      whileTap={{ scale: disabledState ? 1 : 0.98 }}
      className={`${baseClasses} ${sizeClass} ${className}`}
      disabled={disabledState}
      {...(props as MotionButtonProps)}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
        />
      ) : (
        children
      )}
    </motion.button>
  );
}

export function PrimaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button {...props} variant="primary" />;
}

export function SecondaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button {...props} variant="secondary" />;
}

export function IconButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button {...props} variant="icon" />;
}
