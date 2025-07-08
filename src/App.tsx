import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './pages/HomePage';
import { WardrobePage } from './pages/WardrobePage';
import { ProfilePage } from './pages/ProfilePage';
import { User } from './types/User';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'wardrobe' | 'profile'>('home');
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Check for saved user on load
  useEffect(() => {
    const savedUser = localStorage.getItem('virtualWardrobeUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('virtualWardrobeUser', JSON.stringify(userData));
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('virtualWardrobeUser');
    setCurrentPage('home');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onGetStarted={() => user ? setCurrentPage('wardrobe') : setShowAuthModal(true)}
            user={user}
          />
        );
      case 'wardrobe':
        return user ? <WardrobePage user={user} /> : <HomePage onGetStarted={() => setShowAuthModal(true)} user={null} />;
      case 'profile':
        return user ? <ProfilePage user={user} /> : <HomePage onGetStarted={() => setShowAuthModal(true)} user={null} />;
      default:
        return <HomePage onGetStarted={() => setShowAuthModal(true)} user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header 
        user={user}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogin={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />
      
      {renderCurrentPage()}
      
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;