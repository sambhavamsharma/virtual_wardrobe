import React from 'react';
import { Sparkles, Upload, Zap, ArrowRight, Camera, Shirt } from 'lucide-react';

export const HomePage = ({ onGetStarted, user }) => {
  const features = [
    {
      icon: <Camera className="w-8 h-8 text-purple-500" />,
      title: "Snap & Upload",
      description: "Upload your photo in seconds"
    },
    {
      icon: <Shirt className="w-8 h-8 text-blue-500" />,
      title: "Click to Try",
      description: "Just click any clothing item to see it on you"
    },
    {
      icon: <Zap className="w-8 h-8 text-pink-500" />,
      title: "Instant AI Magic",
      description: "No waiting - see results immediately"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full text-purple-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Fashion Preview</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Try On
            </span>
            <br />
            <span className="text-gray-800">Anything</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Upload your photo, click on clothes, and watch the magic happen. 
            No hassle, no waiting - just instant fashion previews.
          </p>
          
          <button
            onClick={onGetStarted}
            className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-3 mx-auto"
          >
            <Upload className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>{user ? 'Open Wardrobe' : 'Start Trying On'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to fashion magic
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-white to-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Ready to See Yourself in Style?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Join the future of fashion - where trying on clothes is as easy as clicking a button.
          </p>
          
          <button
            onClick={onGetStarted}
            className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2 mx-auto border border-purple-100"
          >
            <Sparkles className="w-5 h-5" />
            <span>{user ? 'Go to Wardrobe' : 'Get Started Now'}</span>
          </button>
        </div>
      </section>
    </div>
  );
};