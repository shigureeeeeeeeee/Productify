import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Productify</Link>
        <nav>
          {session ? (
            <>
              <Link href="/dashboard" className="mr-4">ダッシュボード</Link>
              <button onClick={() => signOut()} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
                ログアウト
              </button>
            </>
          ) : (
            <button onClick={() => signIn()} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
              ログイン
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;