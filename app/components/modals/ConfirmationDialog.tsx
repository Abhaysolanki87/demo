'use client';

import React from 'react';
import { Modal } from './Modal';
import { Button } from '../buttons/Button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = false,
}: ConfirmationDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        {isDangerous && (
          <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-500/10 rounded-lg">
            <AlertTriangle className="text-red-500 flex-shrink-0" size={20} />
            <p className="text-sm text-red-700 dark:text-red-400">
              This action cannot be undone.
            </p>
          </div>
        )}
        <p className="text-gray-700 dark:text-gray-300">{message}</p>
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          variant="secondary"
          size="md"
          onClick={onClose}
          className="flex-1"
        >
          {cancelText}
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className={`flex-1 ${isDangerous ? 'bg-red-500 hover:bg-red-600' : ''}`}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
