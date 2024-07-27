'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { IconSun, IconMoon, IconUser, IconLogout } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

const DashboardHeader = () => {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <header className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold">
          Productify
        </Link>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            aria-label={theme === 'dark' ? "ライトモードに切り替え" : "ダークモードに切り替え"}
          >
            {theme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
          </button>
          {session && (
            <div className="relative group">
              <button className="flex items-center focus:outline-none">
                <img 
                  src={session.user?.image || '/default-avatar.png'} 
                  alt="User Avatar" 
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span>{session.user?.name}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <IconUser className="inline mr-2" size={16} />
                  プロフィール
                </Link>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })} 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <IconLogout className="inline mr-2" size={16} />
                  ログアウト
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;