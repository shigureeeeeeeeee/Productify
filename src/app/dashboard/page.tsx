import Dashboard from '@/components/dashboard';
import DashboardHeader from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <DashboardHeader />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Dashboard />
        </main>
        <Footer />
      </div>
    </div>
  );
}