'use client';

import React from 'react';
import { Card } from './Card';
import { Button } from '../buttons/Button';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  buttonText?: string;
  onSelect?: () => void;
  highlighted?: boolean;
}

export function PricingCard({
  name,
  price,
  period = '/month',
  description,
  features,
  buttonText = 'Get Started',
  onSelect,
  highlighted = false,
}: PricingCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`p-6 flex flex-col ${
          highlighted
            ? 'border-blue-400/50 dark:border-blue-400/30 bg-blue-500/10 dark:bg-blue-500/5'
            : ''
        }`}
      >
        {highlighted && (
          <div className="mb-3">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-500/20 px-2 py-1 rounded-full">
              Popular
            </span>
          </div>
        )}

        <h3 className="text-xl font-bold text-black dark:text-white mb-2">
          {name}
        </h3>

        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {description}
          </p>
        )}

        <div className="mb-6">
          <span className="text-3xl font-bold text-black dark:text-white">
            {price}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {period}
          </span>
        </div>

        <ul className="space-y-3 mb-6 flex-1">
          {features.map((feature, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <Check size={16} className="text-green-500 flex-shrink-0" />
              {feature}
            </motion.li>
          ))}
        </ul>

        <Button
          variant={highlighted ? 'primary' : 'secondary'}
          size="md"
          onClick={onSelect}
          className="w-full"
        >
          {buttonText}
        </Button>
      </Card>
    </motion.div>
  );
}
