import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Bell, Settings, Menu } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
  isMobile?: boolean;
}

export default function Layout({ children, isMobile = false }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-fluap-primary text-white p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">FLUAP SIGNALS</h1>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-fluap-primary text-white shadow-md">
        <div className="max-w-7xl mx-auto px-fluap">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-xl font-bold">
                FLUAP SIGNALS
              </Link>
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-fluap transition-colors ${
                    location.pathname === '/'
                      ? 'bg-white/20'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </div>
                </Link>
                <Link
                  to="/rules"
                  className={`px-4 py-2 rounded-fluap transition-colors ${
                    location.pathname === '/rules'
                      ? 'bg-white/20'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Settings size={18} />
                    <span>Regras</span>
                  </div>
                </Link>
                <Link
                  to="/history"
                  className={`px-4 py-2 rounded-fluap transition-colors ${
                    location.pathname === '/history'
                      ? 'bg-white/20'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Bell size={18} />
                    <span>Histórico</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-fluap py-fluap">
        {children}
      </main>
    </div>
  );
}

