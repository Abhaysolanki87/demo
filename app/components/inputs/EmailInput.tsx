'use client';

import React, { useState } from 'react';
import { TextInput } from './TextInput';

interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function EmailInput({ label, value, onChange, ...props }: EmailInputProps) {
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setError('Please enter a valid email address');
    } else {
      setError('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    validateEmail(newValue);
    onChange?.(e);
  };

  return (
    <TextInput
      type="email"
      label={label || 'Email'}
      error={error}
      value={value}
      onChange={handleChange}
      placeholder="you@example.com"
      {...props}
    />
  );
}
