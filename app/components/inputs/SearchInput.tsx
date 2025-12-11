'use client';

import React, { useState } from 'react';
import { TextInput } from './TextInput';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export function SearchInput({ value, onClear, onChange, ...props }: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = Boolean(value && String(value).length > 0);

  return (
    <div className="relative w-full">
      <TextInput
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        icon={
          <motion.div
            animate={{ rotate: isFocused ? 0 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Search size={18} />
          </motion.div>
        }
        {...props}
      />
      {hasValue && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          type="button"
          onClick={() => {
            onClear?.();
            onChange?.({
              target: { value: '' },
            } as React.ChangeEvent<HTMLInputElement>);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
        >
          <X size={18} />
        </motion.button>
      )}
    </div>
  );
}
