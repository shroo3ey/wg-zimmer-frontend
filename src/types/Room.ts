export interface Room {
  id: string;
  title: string;
  city: string;
  district: string;
  address: string;
  rent: number;
  size: number;
  availableFrom: string;
  roommates: number;
  totalRoommates: number;
  description: string;
  amenities: string[];
  images: string[];
  contact: {
    name: string;
    email: string;
    phone?: string;
  };
  features: {
    furnished: boolean;
    balcony: boolean;
    garden: boolean;
    parking: boolean;
    pets: boolean;
    smoking: boolean;
    wlan: boolean;
    dishwasher: boolean;
    washingMachine: boolean;
  };
  utilities: number;
  deposit: number;
  minStay: number;
  // Geo-Koordinaten für Karte
  lat?: number;
  lng?: number;
}

export interface FilterOptions {
  minRent: number;
  maxRent: number;
  cities: string[];
  minSize: number;
  maxSize: number;
  furnished: boolean | null;
  balcony: boolean | null;
  pets: boolean | null;
  parking: boolean | null;
}