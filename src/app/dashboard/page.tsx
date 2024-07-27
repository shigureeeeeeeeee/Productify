import Dashboard from '@/components/dashboard';
import DashboardHeader from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}