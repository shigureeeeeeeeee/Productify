'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const DashboardHeader = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold">Productify</Link>
        <nav className="flex items-center">
          <Link href="/dashboard" className="mr-4 hover:text-gray-300">ダッシュボード</Link>
          <Link href="/todo" className="mr-4 hover:text-gray-300">タスク</Link>
          <Link href="/pomodoro" className="mr-4 hover:text-gray-300">ポモドーロ</Link>
          <Link href="/analytics" className="mr-4 hover:text-gray-300">分析</Link>
          <div className="relative group">
            <button className="flex items-center focus:outline-none">
              <img 
                src={session?.user?.image || '/default-avatar.png'} 
                alt="User Avatar" 
                className="w-8 h-8 rounded-full mr-2"
              />
              <span>{session?.user?.name}</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
              <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">プロフィール</Link>
              <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">設定</Link>
              <button 
                onClick={() => signOut()} 
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                ログアウト
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default DashboardHeader;