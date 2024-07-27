'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IconDashboard, IconClock, IconChartBar, IconSettings, IconLogout, IconMenu2, IconX, IconChevronRight, IconChevronLeft, IconSun, IconMoon, IconList } from '@tabler/icons-react';
import { useTheme } from 'next-themes';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
};

const Sidebar = () => {
  const { data: session } = useSession();
  const [isHovered, setIsHovered] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 1023px)');

  const menuItems = [
    { icon: IconDashboard, label: 'ダッシュボード', href: '/dashboard' },
    { icon: IconList, label: 'Todo', href: '/todo' },
    { icon: IconClock, label: 'ポモドーロ', href: '/pomodoro' },
    { icon: IconChartBar, label: '分析', href: '/analytics' },
    { icon: IconSettings, label: '設定', href: '/settings' },
  ];

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const sidebarVariants = {
    open: { width: '256px', transition: { duration: 0.3 } },
    closed: { width: '64px', transition: { duration: 0.3 } },
  };

  const itemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -20 },
  };

  return (
    <>
      <div
        className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-16 bg-gray-100 dark:bg-gray-800 z-20 flex flex-col items-center py-4 overflow-y-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`p-2 mb-2 rounded-full ${
              pathname === item.href
                ? 'bg-gray-200 dark:bg-gray-700'
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <item.icon size={24} />
          </Link>
        ))}
      </div>
      <AnimatePresence>
        {(isHovered || isMobile) && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className={`bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white h-[calc(100vh-4rem)] fixed left-0 top-16 z-30 shadow-lg overflow-hidden transition-colors duration-300`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex flex-col h-full overflow-y-auto">
              <div className="flex items-center justify-between p-4">
                <motion.h1
                  variants={itemVariants}
                  className="text-2xl font-bold"
                >
                  Productify
                </motion.h1>
                {!isMobile && (
                  <button
                    onClick={toggleCollapse}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    aria-label={isCollapsed ? "サイドバーを展開" : "サイドバーを折りたたむ"}
                  >
                    {isCollapsed ? <IconChevronRight size={24} /> : <IconChevronLeft size={24} />}
                  </button>
                )}
              </div>
              <nav className="flex-grow">
                <ul className="space-y-2 p-4">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className={`flex items-center p-2 rounded transition-colors duration-200 ${
                          pathname === item.href
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        <item.icon className="mr-2" size={20} />
                        <motion.span
                          variants={itemVariants}
                        >
                          {item.label}
                        </motion.span>
                        {pathname === item.href && (
                          <IconChevronRight className="ml-auto" size={16} />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              {session && (
                <motion.div
                  variants={itemVariants}
                  className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={session.user?.image || '/default-avatar.png'}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-semibold">{session.user?.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{session.user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center p-2 rounded w-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    <IconLogout className="mr-2" size={20} />
                    ログアウト
                  </button>
                </motion.div>
              )}
              <button
                onClick={toggleTheme}
                className="p-2 m-4 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-label={theme === 'dark' ? "ライトモードに切り替え" : "ダークモードに切り替え"}
              >
                {theme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;