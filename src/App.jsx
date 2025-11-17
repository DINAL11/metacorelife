import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';
import CartSidebar from './components/cart/CartSidebar';
import WelcomePage from './pages/WelcomePage';
import FeedPage from './pages/FeedPage';
import ChallengesPage from './pages/ChallengesPage';
import MarketplacePage from './pages/MarketplacePage';
import ProfilePage from './pages/ProfilePage';
import mockLocalClient from './services/auth';

export default function App() {
  const [currentPage, setCurrentPage] = useState('welcome');

  const handleLogin = async (email, fullName) => {
    await mockLocalClient.auth.login(email, fullName);
  };

  const handleLogout = () => {
    mockLocalClient.auth.logout();
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage onNavigate={setCurrentPage} onLogin={handleLogin} />;
      case 'feed':
        return <FeedPage />;
      case 'challenges':
        return <ChallengesPage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'profile':
        return <ProfilePage onNavigate={setCurrentPage} onLogout={handleLogout} />;
      default:
        return <FeedPage />;
    }
  };

  return (
    <CartProvider>
      <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
        {renderPage()}
      </Layout>
      <CartSidebar />
    </CartProvider>
  );
}