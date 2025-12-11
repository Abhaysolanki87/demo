'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Bell, ChevronDown } from 'lucide-react';
import { SearchInput } from '../inputs/SearchInput';
import { IconButton } from '../buttons/Button';

interface NavbarProps {
  logo?: React.ReactNode;
  onMenuClick?: () => void;
  showSearch?: boolean;
  showNotifications?: boolean;
  showUserMenu?: boolean;
  userName?: string;
  onLogout?: () => void;
}

export function Navbar({
  logo,
  onMenuClick,
  showSearch = true,
  showNotifications = true,
  showUserMenu = true,
  userName = 'User',
  onLogout,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            {logo ? (
              <div className="text-xl font-bold">{logo}</div>
            ) : (
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg" />
            )}

            {/* Desktop Search */}
            {showSearch && (
              <div className="hidden md:block w-48">
                <SearchInput placeholder="Search files..." />
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                onMenuClick?.();
              }}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Notifications */}
            {showNotifications && (
              <div className="hidden sm:block relative">
                <IconButton>
                  <Bell size={20} />
                </IconButton>
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </div>
            )}

            {/* User Menu */}
            {showUserMenu && (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                  <span className="hidden sm:inline text-sm font-medium">
                    {userName}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      isUserMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-2 space-y-1">
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-sm">
                        Profile
                      </button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-sm">
                        Settings
                      </button>
                      <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onLogout?.();
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors text-sm text-red-600 dark:text-red-400"
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden pb-4">
            <SearchInput placeholder="Search files..." />
          </div>
        )}
      </div>
    </nav>
  );
}
