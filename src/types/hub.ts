export type DepartmentId = 'oil-gas' | 'kitchen' | 'lounge' | 'carwash' | 'garden';

export type PageId = 'home' | 'oil-gas' | 'kitchen' | 'lounge' | 'carwash' | 'garden' | 'promenade' | 'book' | 'location';

export type TimeOfDay = 'day' | 'sunset' | 'night';

export interface Department {
  id: DepartmentId;
  name: string;
  headline: string;
  subtitle: string;
  hours: string;
  phone: string;
  image: string;
  badge: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  description: string;
  storytelling: string;
  highlights: string[];
  keyStats: { label: string; value: string }[];
  threeDCoordinates: [number, number, number];
}

export interface LeasedBusiness {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  hours: string;
  unitNumber: string;
  phone: string;
  specialties: string[];
  offerings: { name: string; price: string; description: string }[];
  accentColor: string;
  leaseBadge: string;
}

export interface FuelProduct {
  id: string;
  name: string;
  shortCode: string;
  pricePerUnit: number;
  unit: string;
  available: boolean;
  dispensersCount: number;
  description: string;
}

export interface KitchenDish {
  id: string;
  name: string;
  category: 'Local Delicacies' | 'Grills & Barbecue' | 'Rice & Continental' | 'Quick Bites';
  price: number;
  description: string;
  badge?: string;
  prepTime: string;
}

export interface LoungePackage {
  id: string;
  name: string;
  category: 'VIP Booth' | 'Executive Table' | 'Cocktail Tasting' | 'Corporate Lounge';
  minSpend: number;
  capacity: string;
  description: string;
  perks: string[];
}

export interface WashService {
  id: string;
  name: string;
  priceSedan: number;
  priceSuv: number;
  durationMin: number;
  isPopular?: boolean;
  description: string;
  features: string[];
}

export interface GardenFeature {
  id: string;
  title: string;
  description: string;
  schedule: string;
  iconName: string;
}
