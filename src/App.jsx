import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ChallengesProvider } from './context/ChallengesContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import CartSidebar from './components/cart/CartSidebar';
import WelcomePage from './pages/WelcomePage';
import FeedPage from './pages/FeedPage';
import SearchPage from './pages/SearchPage';
import UserProfilePage from './pages/UserProfilePage';
import ChallengesPage from './pages/ChallengesPage';
import MarketplacePage from './pages/MarketplacePage';
import ProfilePage from './pages/ProfilePage';
import CreatePostPage from './pages/CreatePostPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [userProfileId, setUserProfileId] = useState(null);
  const [highlightChallengeId, setHighlightChallengeId] = useState(null);

  const handleNavigate = (page, options) => {
    if (page === 'userProfile' && options?.userId) {
      setUserProfileId(options.userId);
      setCurrentPage('userProfile');
    } else if (page === 'challenges') {
      setHighlightChallengeId(options?.highlightChallengeId ?? null);
      setCurrentPage('challenges');
    } else {
      setUserProfileId(null);
      setHighlightChallengeId(null);
      setCurrentPage(page);
    }
  };

  const renderPage = () => {
    if (currentPage === 'userProfile' && userProfileId) {
      return (
        <UserProfilePage
          userId={userProfileId}
          onBack={() => handleNavigate('feed')}
          onNavigate={handleNavigate}
        />
      );
    }
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage onNavigate={handleNavigate} />;
      case 'feed':
        return <FeedPage onNavigate={handleNavigate} />;
      case 'search':
        return <SearchPage onNavigate={handleNavigate} />;
      case 'challenges':
        return <ChallengesPage highlightChallengeId={highlightChallengeId} />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      case 'create':
        return <CreatePostPage onNavigate={handleNavigate} />;
      default:
        return <FeedPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <Layout currentPage={currentPage} onNavigate={handleNavigate}>
        {renderPage()}
      </Layout>
      <CartSidebar />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ChallengesProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </ChallengesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}