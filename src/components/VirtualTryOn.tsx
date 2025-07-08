import React, { useState, useEffect } from 'react';
import { User } from '../types/User';
import { Save, Share2, Download, Sparkles, RefreshCw, Zap, ArrowLeft } from 'lucide-react';

interface VirtualTryOnProps {
  userImage: string;
  selectedClothing: string[];
  user: User;
  currentClothingId?: string;
  onBack: () => void;
}

export const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ 
  userImage, 
  selectedClothing, 
  user,
  currentClothingId,
  onBack
}) => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [currentLook, setCurrentLook] = useState<string | null>(null);
  const [processingText, setProcessingText] = useState('Analyzing your photo...');

  useEffect(() => {
    setIsProcessing(true);
    
    const processingSteps = [
      'Analyzing your photo...',
      'Detecting body landmarks...',
      'Fitting the clothing...',
      'Applying AI magic...',
      'Almost ready!'
    ];
    
    let stepIndex = 0;
    const stepInterval = setInterval(() => {
      if (stepIndex < processingSteps.length - 1) {
        stepIndex++;
        setProcessingText(processingSteps[stepIndex]);
      }
    }, 400);

    const timer = setTimeout(() => {
      clearInterval(stepInterval);
      setIsProcessing(false);
      setCurrentLook(userImage);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(stepInterval);
    };
  }, [userImage, selectedClothing, currentClothingId]);

  const handleSaveLook = () => {
    console.log('Saving look for user:', user.id);
    // Create a nice success animation
    const button = document.activeElement as HTMLButtonElement;
    if (button) {
      button.innerHTML = '✓ Saved!';
      button.classList.add('bg-green-500');
      setTimeout(() => {
        button.innerHTML = '<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L10 12.586l-2.293-2.293z"/></svg>Save Look';
        button.classList.remove('bg-green-500');
      }, 2000);
    }
  };

  const handleShareLook = () => {
    navigator.share?.({
      title: 'Check out my virtual try-on!',
      text: 'I tried on this outfit using AI - what do you think?',
      url: window.location.href
    }).catch(() => {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    });
  };

  const handleDownload = () => {
    // Simulate download
    const link = document.createElement('a');
    link.href = currentLook || userImage;
    link.download = 'my-virtual-tryon.jpg';
    link.click();
  };

  const handleRetry = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Clothes</span>
        </button>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">AI Try-On Preview</h2>
          <p className="text-gray-600">
            {isProcessing ? 'AI is working its magic...' : 'Here\'s how it looks on you!'}
          </p>
        </div>
        
        <div></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Original Image */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">Original</h3>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Your Photo
            </div>
          </div>
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-lg">
            <img
              src={userImage}
              alt="Original"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
        
        {/* Try-On Result */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">AI Preview</h3>
            <div className="text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>AI Generated</span>
            </div>
          </div>
          <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl overflow-hidden shadow-lg">
            {isProcessing ? (
              <div className="w-full h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 mx-auto"></div>
                    <Zap className="w-6 h-6 text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <p className="text-gray-700 font-medium text-lg">{processingText}</p>
                  <p className="text-sm text-gray-500 mt-2">This usually takes a few seconds</p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={currentLook}
                  alt="Try-on result"
                  className="w-full h-96 object-cover"
                />
                
                {/* Subtle overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600 via-transparent to-transparent opacity-5"></div>
                
                {/* Success indicator */}
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1 animate-pulse">
                  <span>✓</span>
                  <span>Ready!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <button
          onClick={handleSaveLook}
          disabled={isProcessing}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <Save className="w-5 h-5" />
          <span>Save Look</span>
        </button>
        
        <button
          onClick={handleShareLook}
          disabled={isProcessing}
          className="bg-white border-2 border-purple-500 text-purple-500 px-6 py-3 rounded-2xl font-semibold hover:bg-purple-50 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
        
        <button
          onClick={handleDownload}
          disabled={isProcessing}
          className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <Download className="w-5 h-5" />
          <span>Download</span>
        </button>
        
        <button
          onClick={handleRetry}
          className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Retry</span>
        </button>
      </div>
      
      {/* Quick Stats */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600 mb-1">2.3s</div>
            <div className="text-sm text-gray-600">Processing Time</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-pink-600 mb-1">98%</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600 mb-1">{selectedClothing.length}</div>
            <div className="text-sm text-gray-600">Items Tried</div>
          </div>
        </div>
      </div>
    </div>
  );
};