import React, { useState, useRef } from 'react';
import { Upload, Camera, X, Check, Sparkles, Zap } from 'lucide-react';

export const ImageUpload = ({ onImageUpload, currentImage }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(currentImage);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    if (preview) {
      onImageUpload(preview);
    }
  };

  const handleClear = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full text-purple-700 text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Step 1: Upload Your Photo</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Ready for Your Close-Up?</h2>
        <p className="text-gray-600 text-lg">
          Take a clear, front-facing photo for the best AI try-on experience
        </p>
      </div>
      
      {!preview ? (
        <div
          className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 scale-105' 
              : 'border-gray-300 hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Upload className="w-10 h-10 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            Drop your photo here
          </h3>
          <p className="text-gray-600 mb-8 text-lg">
            or click to select from your device
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Upload className="w-5 h-5" />
              <span>Choose File</span>
            </button>
            
            <button className="bg-white border-2 border-purple-500 text-purple-500 px-8 py-4 rounded-2xl font-semibold hover:bg-purple-50 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Camera className="w-5 h-5" />
              <span>Take Photo</span>
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <p className="text-sm text-gray-500 mt-6">
            Supported: JPG, PNG, GIF (max 10MB)
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="relative group">
            <img
              src={preview}
              alt="Preview"
              className="w-full max-w-md mx-auto rounded-3xl shadow-2xl group-hover:shadow-3xl transition-shadow duration-300"
            />
            <button
              onClick={handleClear}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-3 hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2 text-purple-600 font-semibold text-sm">
              <Zap className="w-4 h-4" />
              <span>Ready for AI Magic!</span>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleClear}
              className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Choose Different Photo
            </button>
            
            <button
              onClick={handleConfirm}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Check className="w-5 h-5" />
              <span>Perfect! Let's Continue</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};