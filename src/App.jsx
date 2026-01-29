import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ChallengesProvider } from './context/ChallengesContext';
import Layout from './components/layout/Layout';
import CartSidebar from './components/cart/CartSidebar';
import WelcomePage from './pages/WelcomePage';
import FeedPage from './pages/FeedPage';
import ChallengesPage from './pages/ChallengesPage';
import MarketplacePage from './pages/MarketplacePage';
import ProfilePage from './pages/ProfilePage';
import CreatePostPage from './pages/CreatePostPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('welcome');

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage onNavigate={setCurrentPage} />;
      case 'feed':
        return <FeedPage onNavigate={setCurrentPage} />;
      case 'challenges':
        return <ChallengesPage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'profile':
        return <ProfilePage onNavigate={setCurrentPage} />;
      case 'create':
        return <CreatePostPage onNavigate={setCurrentPage} />;
      default:
        return <FeedPage />;
    }
  };

  return (
    <AuthProvider>
      <ChallengesProvider>
        <CartProvider>
          <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
            {renderPage()}
          </Layout>
          <CartSidebar />
        </CartProvider>
      </ChallengesProvider>
    </AuthProvider>
  );
}