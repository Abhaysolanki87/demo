'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export function Breadcrumbs({
  items,
  separator = <ChevronRight size={16} />,
}: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className="text-gray-400 dark:text-gray-600">{separator}</span>
          )}
          {item.href || item.onClick ? (
            <button
              onClick={item.onClick}
              className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline transition-colors"
            >
              {item.icon}
              {item.label}
            </button>
          ) : (
            <span className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
              {item.icon}
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
