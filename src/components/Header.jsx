import React from 'react';
import { User, ShoppingBag, LogOut, Home, User as UserIcon } from 'lucide-react';

export const Header = ({ 
  user, 
  currentPage, 
  onPageChange, 
  onLogin, 
  onLogout 
}) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Virtual Wardrobe
            </h1>
          </div>
          
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => onPageChange('home')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'home' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
            
            {user && (
              <button
                onClick={() => onPageChange('wardrobe')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'wardrobe' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Wardrobe</span>
              </button>
            )}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onPageChange('profile')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'profile' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  <UserIcon className="w-5 h-5" />
                  <span>Profile</span>
                </button>
                
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};