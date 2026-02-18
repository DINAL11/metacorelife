import React from 'react';
import { Home, Target, PlusCircle, ShoppingBag, User, Search, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CompanyLogo from '../common/CompanyLogo';
import ThemeToggle from '../common/ThemeToggle';

export default function Layout({ children, currentPage, onNavigate }) {
  const { getItemCount, setShowCart } = useCart();

  if (currentPage === 'welcome') return children;

  const navItems = [
    { name: 'Feed', icon: Home, page: 'feed' },
    { name: 'Search', icon: Search, page: 'search' },
    { name: 'Challenges', icon: Target, page: 'challenges' },
    { name: 'Create', icon: PlusCircle, page: 'create', special: true },
    { name: 'Shop', icon: ShoppingBag, page: 'marketplace' },
    { name: 'Profile', icon: User, page: 'profile' }
  ];

  const itemCount = getItemCount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-screen-lg mx-auto px-3 md:px-4 py-3 md:py-4 flex items-center justify-between gap-2">
          <button onClick={() => onNavigate('feed')} className="flex items-center gap-1.5 md:gap-2 shrink-0">
            <CompanyLogo size="sm" />
            <span className="font-bold text-lg md:text-xl bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              MetaCoreLife
            </span>
          </button>
          <ThemeToggle />
          <button onClick={() => setShowCart(true)} className="relative p-2">
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-slate-600 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-lg mx-auto px-3 md:px-4 py-4 md:py-6">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50 safe-area-inset-bottom">
        <div className="max-w-screen-lg mx-auto px-1 md:px-2 py-2">
          <div className="flex justify-around items-center">
            {navItems.map(item => {
              const Icon = item.icon;
              const active = currentPage === item.page;
              
              if (item.special) {
                return (
                  <button
                    key={item.name}
                    onClick={() => onNavigate(item.page)}
                    className="flex flex-col items-center gap-0.5 md:gap-1 p-1.5 md:p-2"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl md:rounded-2xl blur-md opacity-60"></div>
                      <div className="relative bg-gradient-to-br from-cyan-500 to-purple-600 p-2 md:p-3 rounded-xl md:rounded-2xl shadow-lg">
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                    </div>
                  </button>
                );
              }

              return (
                <button
                  key={item.name}
                  onClick={() => onNavigate(item.page)}
                  className={`flex flex-col items-center gap-0.5 md:gap-1 p-1.5 md:p-2 transition-colors min-w-[44px] ${
                    active ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 ${active ? 'fill-cyan-100' : ''}`} />
                  <span className="text-[10px] md:text-xs font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}