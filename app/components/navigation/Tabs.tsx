'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTabId: string;
  onChange: (tabId: string) => void;
  children?: React.ReactNode;
}

export function Tabs({ tabs, activeTabId, onChange, children }: TabsProps) {
  return (
    <div className="w-full">
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const isActive = activeTabId === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={`
                  relative px-4 py-3 font-medium text-sm
                  transition-colors duration-200
                  ${
                    isActive
                      ? 'text-black dark:text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }
                  flex items-center gap-2
                `}
              >
                {tab.icon}
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="tabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
      {children}
    </div>
  );
}

interface TabContentProps {
  tabId: string;
  activeTabId: string;
  children: React.ReactNode;
}

export function TabContent({ tabId, activeTabId, children }: TabContentProps) {
  if (tabId !== activeTabId) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
