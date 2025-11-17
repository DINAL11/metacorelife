import React, { useState } from 'react';
import { Heart, TrendingUp, Users, ArrowRight, Sparkles } from 'lucide-react';
import CompanyLogo from '../components/common/CompanyLogo';
import LoginModal from '../components/auth/LoginModal';

export default function WelcomePage({ onNavigate, onLogin }) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = async (email, fullName) => {
    await onLogin(email, fullName);
    setShowLoginModal(false);
    onNavigate('feed');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-purple-50 to-pink-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full blur-2xl opacity-40"></div>
            <div className="relative bg-white p-6 rounded-3xl shadow-2xl">
              <CompanyLogo size="lg" />
            </div>
          </div>
        </div>
        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">MetaCoreLife</h1>
        <p className="text-xl text-slate-600 text-center mb-3 max-w-md">The social platform for personal growth</p>
        <p className="text-sm text-slate-500 text-center mb-12 max-w-sm">Join challenges, track your progress, and grow together with a supportive community</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl w-full">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-white/50">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Health</h3>
            <p className="text-sm text-slate-600">Build better habits and routines</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-white/50">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Wealth</h3>
            <p className="text-sm text-slate-600">Grow your financial wellness</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-white/50">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Relationships</h3>
            <p className="text-sm text-slate-600">Deepen meaningful connections</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <button onClick={() => setShowLoginModal(true)} className="w-full h-14 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
            Get Started<ArrowRight className="w-5 h-5" />
          </button>
          <button onClick={() => onNavigate('feed')} className="w-full h-14 border-2 border-slate-300 hover:border-slate-400 rounded-2xl text-slate-700 font-semibold hover:bg-white/50 transition-all duration-300">Explore as Guest</button>
        </div>
        
        <p className="text-xs text-slate-500 text-center mt-8 max-w-md flex items-center justify-center gap-1">
          <Sparkles className="w-4 h-4" />A social network that actually improves your life
        </p>
      </div>
      <div className="text-center py-6 text-xs text-slate-400">© 2024 MetaCoreLife • The good-for-you social platform</div>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />
    </div>
  );
}