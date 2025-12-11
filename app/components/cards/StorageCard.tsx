'use client';

import React from 'react';
import { Card } from './Card';
import { motion } from 'framer-motion';
import { HardDrive } from 'lucide-react';

interface StorageCardProps {
  used: number;
  total: number;
  unit?: string;
}

export function StorageCard({
  used,
  total,
  unit = 'GB',
}: StorageCardProps) {
  const percentage = (used / total) * 100;
  const color =
    percentage < 50
      ? 'from-green-400 to-blue-500'
      : percentage < 80
        ? 'from-yellow-400 to-orange-500'
        : 'from-red-400 to-pink-500';

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <HardDrive className="text-blue-500" size={24} />
          </div>
          <div>
            <p className="font-semibold text-black dark:text-white">Storage</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {used.toFixed(1)} {unit} of {total} {unit}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full bg-gradient-to-r ${color}`}
          />
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 text-right">
          {percentage.toFixed(1)}% used
        </p>
      </div>
    </Card>
  );
}
