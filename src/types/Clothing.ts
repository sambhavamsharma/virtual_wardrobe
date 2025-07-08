export interface ClothingItem {
  id: string;
  name: string;
  category: 'tops' | 'bottoms' | 'jackets' | 'dresses' | 'accessories';
  image: string;
  price: number;
  brand: string;
  colors: string[];
  sizes: string[];
  description: string;
  rating: number;
  isPopular?: boolean;
}