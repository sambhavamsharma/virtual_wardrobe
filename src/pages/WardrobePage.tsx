import React, { useState } from 'react';
import { User } from '../types/User';
import { ImageUpload } from '../components/ImageUpload';
import { ClothingGrid } from '../components/ClothingGrid';
import { VirtualTryOn } from '../components/VirtualTryOn';
import { Upload, Sparkles, Shirt, Camera } from 'lucide-react';

interface WardrobePageProps {
  user: User;
}

export const WardrobePage: React.FC<WardrobePageProps> = ({ user }) => {
  const [userImage, setUserImage] = useState<string | null>(user.uploadedImage || null);
  const [selectedClothing, setSelectedClothing] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'upload' | 'clothes' | 'preview'>('upload');
  const [currentTryOnClothing, setCurrentTryOnClothing] = useState<string | null>(null);

  const handleImageUpload = (image: string) => {
    setUserImage(image);
    setActiveTab('clothes');
  };

  const handleClothingSelect = (clothingId: string) => {
    setSelectedClothing(prev => 
      prev.includes(clothingId) 
        ? prev.filter(id => id !== clothingId)
        : [...prev, clothingId]
    );
  };

  const handleInstantTryOn = (clothingId: string) => {
    setCurrentTryOnClothing(clothingId);
    setActiveTab('preview');
  };

  const handleBackToClothes = () => {
    setActiveTab('clothes');
    setCurrentTryOnClothing(null);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Your Virtual Wardrobe
          </h1>
          <p className="text-gray-600 text-lg">
            {!userImage ? 'Upload your photo to get started' : 'Click on any clothing item to try it on instantly'}
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-2 flex">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                activeTab === 'upload' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              <Camera className="w-5 h-5" />
              <span>Upload Photo</span>
            </button>
            
            <button
              onClick={() => setActiveTab('clothes')}
              disabled={!userImage}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                activeTab === 'clothes' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                  : userImage 
                    ? 'text-gray-600 hover:text-purple-600 hover:bg-purple-50' 
                    : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <Shirt className="w-5 h-5" />
              <span>Try On Clothes</span>
            </button>
            
            <button
              onClick={() => setActiveTab('preview')}
              disabled={!userImage || (!selectedClothing.length && !currentTryOnClothing)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                activeTab === 'preview' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                  : userImage && (selectedClothing.length > 0 || currentTryOnClothing)
                    ? 'text-gray-600 hover:text-purple-600 hover:bg-purple-50' 
                    : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span>AI Preview</span>
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {activeTab === 'upload' && (
            <ImageUpload onImageUpload={handleImageUpload} currentImage={userImage} />
          )}
          
          {activeTab === 'clothes' && (
            <ClothingGrid 
              selectedClothing={selectedClothing}
              onClothingSelect={handleClothingSelect}
              onInstantTryOn={handleInstantTryOn}
              hasUserImage={!!userImage}
            />
          )}
          
          {activeTab === 'preview' && userImage && (
            <VirtualTryOn 
              userImage={userImage}
              selectedClothing={selectedClothing}
              user={user}
              currentClothingId={currentTryOnClothing || undefined}
              onBack={handleBackToClothes}
            />
          )}
        </div>
      </div>
    </div>
  );
};