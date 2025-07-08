import React from 'react';
import { User } from '../types/User';
import { Heart, Calendar, Settings, Zap, TrendingUp, Camera, Shirt } from 'lucide-react';

interface ProfilePageProps {
  user: User;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const stats = [
    { icon: <Heart className="w-6 h-6" />, label: "Saved Looks", value: user.savedLooks.length, color: "text-red-500" },
    { icon: <Shirt className="w-6 h-6" />, label: "Items Tried", value: "47", color: "text-blue-500" },
    { icon: <Zap className="w-6 h-6" />, label: "AI Sessions", value: "23", color: "text-purple-500" },
    { icon: <Calendar className="w-6 h-6" />, label: "Days Active", value: "15", color: "text-green-500" }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 rounded-full text-purple-700 text-sm font-medium mt-3">
                  <Zap className="w-4 h-4" />
                  <span>AI Fashion Explorer</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                  <span className="text-gray-600">Style Preference</span>
                  <span className="capitalize text-purple-600 font-semibold">
                    {user.preferences.style}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                  <span className="text-gray-600">Gender</span>
                  <span className="capitalize text-purple-600 font-semibold">
                    {user.preferences.gender}
                  </span>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <Settings className="w-5 h-5" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Stats and Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-3xl shadow-xl p-6 text-center hover:shadow-2xl transition-shadow duration-300">
                  <div className={`flex justify-center mb-3 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Saved Looks */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Saved Looks</h3>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-semibold bg-purple-50 px-4 py-2 rounded-full hover:bg-purple-100 transition-colors">
                  View All
                </button>
              </div>
              
              {user.savedLooks.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-purple-500" />
                  </div>
                  <p className="text-gray-500 text-lg font-medium">No saved looks yet</p>
                  <p className="text-sm text-gray-400 mt-2">Start trying on clothes to save your favorite looks!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user.savedLooks.map((look) => (
                    <div key={look.id} className="border-2 border-gray-100 rounded-2xl p-4 hover:border-purple-200 transition-colors">
                      <img 
                        src={look.image} 
                        alt={look.name}
                        className="w-full h-48 object-cover rounded-xl mb-3"
                      />
                      <h4 className="font-semibold text-gray-800">{look.name}</h4>
                      <p className="text-sm text-gray-600">{look.clothing.length} items</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Recent Activity</h3>
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Tried on 3 new outfits</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Added 2 items to wishlist</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Uploaded new photo</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};