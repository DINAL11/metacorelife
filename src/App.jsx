import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ChallengesProvider } from './context/ChallengesContext';
import Layout from './components/layout/Layout';
import CartSidebar from './components/cart/CartSidebar';
import WelcomePage from './pages/WelcomePage';
import OnboardingPage from './pages/OnboardingPage';
import FeedPage from './pages/FeedPage';
import ChallengesPage from './pages/ChallengesPage';
import MarketplacePage from './pages/MarketplacePage';
import ProfilePage from './pages/ProfilePage';
import CreatePostPage from './pages/CreatePostPage';

function AppContent() {
  const { user, loading, completeOnboarding } = useAuth();
  const [currentPage, setCurrentPage] = useState('welcome');

  const renderPage = () => {
    // Show onboarding for new users who haven't seen it
    if (user && user.onboardingSeen === false && currentPage !== 'welcome') {
      return (
        <OnboardingPage
          onComplete={completeOnboarding}
          onNavigate={setCurrentPage}
        />
      );
    }

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

  const showOnboarding = user && user.onboardingSeen === false && currentPage !== 'welcome';
  const effectivePage = showOnboarding ? 'onboarding' : currentPage;

  return (
    <>
      <Layout currentPage={effectivePage} onNavigate={setCurrentPage}>
        {renderPage()}
      </Layout>
      <CartSidebar />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ChallengesProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ChallengesProvider>
    </AuthProvider>
  );
}