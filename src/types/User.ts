export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  uploadedImage?: string;
  savedLooks: SavedLook[];
  wishlist: string[];
  preferences: UserPreferences;
}

export interface SavedLook {
  id: string;
  name: string;
  image: string;
  clothing: string[];
  createdAt: Date;
}

export interface UserPreferences {
  gender: 'male' | 'female' | 'other';
  style: 'casual' | 'formal' | 'sporty' | 'trendy';
  favoriteColors: string[];
}