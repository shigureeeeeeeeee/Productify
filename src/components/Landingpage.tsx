import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

const LandingPage: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 flex flex-col justify-center items-center text-gray-800">
      <header className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4 text-gray-900">Productify</h1>
        <p className="text-2xl text-gray-600">生産性を最大化するためのオールインワンソリューション</p>
      </header>

      <main className="text-center mb-12 max-w-2xl">
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">主な機能</h2>
          <ul className="text-lg text-gray-700 grid grid-cols-2 gap-4">
            <li className="bg-white p-4 rounded-lg shadow-md">✅ タスク管理</li>
            <li className="bg-white p-4 rounded-lg shadow-md">⏱️ ポモドーロタイマー</li>
            <li className="bg-white p-4 rounded-lg shadow-md">📊 生産性分析</li>
            <li className="bg-white p-4 rounded-lg shadow-md">📅 カレンダー統合</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">なぜProductifyを選ぶのか？</h2>
          <p className="text-lg text-gray-700 bg-white p-6 rounded-lg shadow-md">
            Productifyは、タスク管理、時間追跡、生産性分析を1つのプラットフォームに統合し、
            あなたの生産性を最大限に引き出します。直感的なインターフェースと強力な機能で、
            効率的な作業をサポートします。
          </p>
        </section>

        {!session ? (
          <button
            onClick={() => signIn()}
            className="bg-gray-800 text-white font-bold py-3 px-6 rounded-full text-xl hover:bg-gray-700 transition duration-300"
          >
            今すぐ始める
          </button>
        ) : (
          <Link href="/dashboard" className="bg-gray-800 text-white font-bold py-3 px-6 rounded-full text-xl hover:bg-gray-700 transition duration-300">
            ダッシュボードへ
          </Link>
        )}
      </main>

      <footer className="text-center text-gray-600">
        <p>&copy; 2024 Productify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;