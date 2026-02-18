import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #0f172a 100%)'
          : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)'
      }}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div
        className="absolute top-1 w-5 h-5 rounded-full bg-white dark:bg-slate-700 shadow-md flex items-center justify-center transition-all duration-300"
        style={{ left: isDark ? '4px' : '32px' }}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-cyan-300" />
        ) : (
          <Sun className="w-3 h-3 text-amber-500" />
        )}
      </div>
    </button>
  );
}
