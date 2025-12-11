'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  children?: SidebarItem[];
}

interface SidebarProps {
  items: SidebarItem[];
  activeId?: string;
  onItemClick?: (item: SidebarItem) => void;
  collapsible?: boolean;
}

export function Sidebar({
  items,
  activeId,
  onItemClick,
  collapsible = false,
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const renderItem = (item: SidebarItem, level = 0) => {
    const isExpanded = expandedItems.has(item.id);
    const isActive = activeId === item.id;

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            onItemClick?.(item);
            if (item.children?.length) {
              toggleExpanded(item.id);
            }
          }}
          className={`
            w-full flex items-center gap-3 px-4 py-2.5
            rounded-lg transition-all duration-200
            text-left text-sm font-medium
            ${
              isActive
                ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }
            ${level > 0 ? 'ml-2' : ''}
          `}
        >
          {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
          {!isCollapsed && (
            <>
              <span className="flex-1">{item.label}</span>
              {item.children && item.children.length > 0 && (
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight size={16} />
                </motion.div>
              )}
            </>
          )}
        </button>

        {!isCollapsed && item.children && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1"
          >
            {item.children.map((child) => renderItem(child, level + 1))}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-800
        transition-all duration-300
        ${isCollapsed ? 'w-20' : 'w-64'}
        h-screen overflow-y-auto
      `}
    >
      <div className="p-4 space-y-2">
        {collapsible && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isCollapsed ? '→' : '←'}
          </button>
        )}

        <nav className="space-y-1">{items.map((item) => renderItem(item))}</nav>
      </div>
    </aside>
  );
}
