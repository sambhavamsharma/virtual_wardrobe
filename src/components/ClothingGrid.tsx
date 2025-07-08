import React, { useState, useMemo } from 'react';
import { ClothingItem } from '../types/Clothing';
import { Filter, Search, Heart, Sparkles, Zap } from 'lucide-react';

interface ClothingGridProps {
  selectedClothing: string[];
  onClothingSelect: (id: string) => void;
  onInstantTryOn: (clothingId: string) => void;
  hasUserImage: boolean;
}

export const ClothingGrid: React.FC<ClothingGridProps> = ({ 
  selectedClothing, 
  onClothingSelect, 
  onInstantTryOn,
  hasUserImage
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock clothing data
  const clothingItems: ClothingItem[] = [
    {
      id: '1',
      name: 'Classic White Tee',
      category: 'tops',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 29.99,
      brand: 'StyleCo',
      colors: ['white', 'black', 'gray'],
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'Comfortable cotton t-shirt',
      rating: 4.5,
      isPopular: true
    },
    {
      id: '2',
      name: 'Blue Denim Jeans',
      category: 'bottoms',
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 79.99,
      brand: 'DenimPro',
      colors: ['blue', 'black', 'gray'],
      sizes: ['28', '30', '32', '34', '36'],
      description: 'Classic straight-fit jeans',
      rating: 4.3
    },
    {
      id: '3',
      name: 'Leather Jacket',
      category: 'jackets',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 199.99,
      brand: 'LeatherLux',
      colors: ['black', 'brown'],
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'Premium leather jacket',
      rating: 4.8,
      isPopular: true
    },
    {
      id: '4',
      name: 'Summer Dress',
      category: 'dresses',
      image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 89.99,
      brand: 'FloralFash',
      colors: ['pink', 'blue', 'yellow'],
      sizes: ['XS', 'S', 'M', 'L'],
      description: 'Light summer dress',
      rating: 4.6
    },
    {
      id: '5',
      name: 'Cozy Hoodie',
      category: 'tops',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 49.99,
      brand: 'ComfortWear',
      colors: ['gray', 'black', 'navy'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Soft comfortable hoodie',
      rating: 4.4
    },
    {
      id: '6',
      name: 'Formal Blazer',
      category: 'jackets',
      image: 'https://images.pexels.com/photos/1496647/pexels-photo-1496647.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 149.99,
      brand: 'FormalFit',
      colors: ['black', 'navy', 'gray'],
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'Professional blazer',
      rating: 4.7
    }
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'tops', label: 'Tops' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'jackets', label: 'Jackets' },
    { id: 'dresses', label: 'Dresses' }
  ];

  const filteredItems = useMemo(() => {
    return clothingItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.brand.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleClothingClick = (item: ClothingItem) => {
    if (hasUserImage) {
      onInstantTryOn(item.id);
    } else {
      onClothingSelect(item.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clothes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {!hasUserImage && (
          <div className="text-sm text-gray-500 bg-yellow-50 px-4 py-2 rounded-2xl border border-yellow-200">
            Upload your photo first to enable instant try-on
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className="group bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            onClick={() => handleClothingClick(item)}
          >
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {item.isPopular && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                  ✨ Popular
                </div>
              )}
              
              <div className="absolute top-3 right-3">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onClothingSelect(item.id);
                  }}
                  className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-100 transition-all duration-200 shadow-lg"
                >
                  <Heart className={`w-4 h-4 ${selectedClothing.includes(item.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                </button>
              </div>
              
              {hasUserImage && (
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2 text-purple-600 font-semibold text-sm">
                    <Zap className="w-4 h-4" />
                    <span>Click to Try On</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-5">
              <h3 className="font-bold text-gray-800 mb-1 text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{item.brand}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ${item.price}
                </span>
                <div className="flex space-x-1">
                  {item.colors.slice(0, 3).map(color => (
                    <div
                      key={color}
                      className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg font-medium">No items found</p>
          <p className="text-gray-400">Try adjusting your search or category filter</p>
        </div>
      )}
    </div>
  );
};