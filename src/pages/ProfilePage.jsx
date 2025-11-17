import React from 'react';

export default function ProfilePage({ onNavigate, onLogout }) {
  const handleLogout = () => {
    onLogout();
    onNavigate('welcome');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl p-8 shadow-sm text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
          U
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome!</h2>
        <p className="text-slate-600 mb-6">Your personal growth journey starts here</p>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-600">0</div>
            <div className="text-sm text-slate-500">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-sm text-slate-500">Challenges</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">0</div>
            <div className="text-sm text-slate-500">Following</div>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}