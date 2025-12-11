'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const typeConfig = {
  success: {
    bg: 'bg-green-500',
    icon: <Check size={20} />,
  },
  error: {
    bg: 'bg-red-500',
    icon: <AlertCircle size={20} />,
  },
  info: {
    bg: 'bg-blue-500',
    icon: <Info size={20} />,
  },
  warning: {
    bg: 'bg-yellow-500',
    icon: <AlertTriangle size={20} />,
  },
};

export function Toast({
  id,
  type,
  message,
  duration = 4000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const config = typeConfig[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: 400 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -20, x: 400 }}
      transition={{ duration: 0.3 }}
      className={`
        ${config.bg}
        text-white px-4 py-3 rounded-lg
        shadow-lg
        flex items-center gap-3
        min-w-64
      `}
    >
      {config.icon}
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button
        onClick={() => onClose(id)}
        className="p-1 hover:bg-white/20 rounded transition-colors"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}

export function ToastContainer({
  toasts,
  onClose,
}: {
  toasts: Array<Omit<ToastProps, 'onClose'>>;
  onClose: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<Array<Omit<ToastProps, 'onClose'>>>([]);

  const addToast = (
    message: string,
    type: ToastType = 'info',
    duration?: number
  ) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message, duration }]);
    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return {
    toasts,
    addToast,
    removeToast,
    success: (message: string, duration?: number) =>
      addToast(message, 'success', duration),
    error: (message: string, duration?: number) =>
      addToast(message, 'error', duration),
    info: (message: string, duration?: number) =>
      addToast(message, 'info', duration),
    warning: (message: string, duration?: number) =>
      addToast(message, 'warning', duration),
  };
}
