'use client';

import React, { useState } from 'react';
import { Card } from './Card';
import { motion } from 'framer-motion';
import { File, Download, Trash2 } from 'lucide-react';

interface FileCardProps {
  name: string;
  size: string;
  date: string;
  icon?: React.ReactNode;
  onDownload?: () => void;
  onDelete?: () => void;
}

export function FileCard({
  name,
  size,
  date,
  icon,
  onDownload,
  onDelete,
}: FileCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.05 : 1,
        rotateZ: isHovered ? 2 : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4">
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3 flex-1">
              <div className="text-2xl">{icon || <File />}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-black dark:text-white truncate">
                  {name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{size}</p>
              </div>
            </div>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-1"
              >
                {onDownload && (
                  <button
                    onClick={onDownload}
                    className="p-1.5 hover:bg-blue-500/20 rounded transition-colors"
                  >
                    <Download size={16} className="text-blue-500" />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={onDelete}
                    className="p-1.5 hover:bg-red-500/20 rounded transition-colors"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                )}
              </motion.div>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-auto">
            {date}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
