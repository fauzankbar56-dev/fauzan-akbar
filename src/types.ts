export type BakeryCategory = 'all' | 'brownies' | 'cakes' | 'pastries' | 'gift-boxes';

export interface BakeryProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'brownies' | 'cakes' | 'pastries' | 'gift-boxes';
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  tags: string[];
  badge?: string;
  pieces?: string;
  weight?: string;
  serves?: string;
  isBestseller?: boolean;
  isEggless?: boolean;
  isGlutenFree?: boolean;
  calories?: string;
  flavorNotes?: string[];
}

export interface CartItem {
  id: string;
  product: BakeryProduct;
  quantity: number;
  selectedBoxFlavors?: string[];
  giftNote?: string;
  customization?: {
    drizzle?: string;
    candle?: boolean;
    topping?: string;
  };
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  productName: string;
  verified: boolean;
  avatar: string;
}
