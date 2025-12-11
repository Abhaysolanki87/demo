'use client';

import React, { useState } from 'react';
import { Modal } from './Modal';
import { PasswordInput } from '../inputs/PasswordInput';
import { Button } from '../buttons/Button';
import { Lock } from 'lucide-react';

interface PasswordProtectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  title?: string;
  message?: string;
}

export function PasswordProtectionModal({
  isOpen,
  onClose,
  onSubmit,
  title = 'Protected File',
  message = 'This file is password protected. Please enter the password to access it.',
}: PasswordProtectionModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password) {
      setError('Password is required');
      return;
    }
    setIsLoading(true);
    try {
      onSubmit(password);
      setPassword('');
      setError('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
          <Lock className="text-blue-500 flex-shrink-0" size={20} />
          <p className="text-sm text-blue-700 dark:text-blue-400">{message}</p>
        </div>

        <PasswordInput
          label="Enter Password"
          error={error}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          variant="secondary"
          size="md"
          onClick={onClose}
          className="flex-1"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={handleSubmit}
          className="flex-1"
          isLoading={isLoading}
          disabled={isLoading || !password}
        >
          Unlock
        </Button>
      </div>
    </Modal>
  );
}
