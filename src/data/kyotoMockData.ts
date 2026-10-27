export type CardType = 'stay' | 'experience' | 'food';

export interface StayCardItem {
  cardType: 'stay';
  id: string;
  title: string;
  propertyType: string;
  location: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  rating?: number | null;
  reviewsCount?: number | null;
  pricePerNight: number;
  currency: string;
  amenities?: string[];
  imageUrl: string;
  superhost?: boolean;
}

export interface DayPlan {
  day: number;
  date: string;
  activity: string;
  time?: string;
}

export interface ExperienceCardItem {
  cardType: 'experience';
  id: string;
  title: string;
  category: string;
  hostName?: string | null;
  durationMinutes?: number | null;
  groupSizeMax?: number | null;
  pricePerPerson: number;
  currency: string;
  dayByDayPlan: DayPlan[];
  imageUrl: string;
}

export interface FoodCardItem {
  cardType: 'food';
  id: string;
  restaurantName: string;
  cuisineType: string;
  neighborhood: string;
  priceTier: string; // e.g., '$$'
  specialtyDish?: string | null;
  accolades?: string[];
  reservationSlot: string;
  imageUrl: string;
}

export type ItineraryCardItem = StayCardItem | ExperienceCardItem | FoodCardItem;

export interface TripItinerary {
  tripId: string;
  title: string;
  summary: string;
  dates: {
    checkIn: string;
    checkOut: string;
    nights: number;
  };
  items: [StayCardItem, ExperienceCardItem, FoodCardItem];
}

// Helper to return value or filler line
export const FILLER_CHAR = "—";

export function formatField<T>(value: T | null | undefined, fallback: string = FILLER_CHAR): string {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }
  return String(value);
}

// Exact rows extracted from the Kyoto Weekend Content Pack (Stays, Experiences, Food)
// Fixed reference dates: Friday 11 Apr to Sunday 13 Apr 2025 (2 nights)
export const KYOTO_TRIP_PACKS: Record<string, TripItinerary> = {
  // Option 1: Higashiyama Zen & Cultural Heritage (Primary Reference)
  "higashiyama-zen": {
    tripId: "kyoto-zen-heritage",
    title: "Cultural & Zen Heritage Weekend",
    summary: "Historic wooden machiya, private Zen temple session, and Michelin-recognized Kaiseki dining.",
    dates: { checkIn: "2025-04-11", checkOut: "2025-04-13", nights: 2 },
    items: [
      {
        cardType: 'stay',
        id: "stay-higashiyama-01",
        title: "Machiya Townhouse Kyoto",
        propertyType: "Entire machiya",
        location: "Higashiyama District, Kyoto",
        checkIn: "2025-04-11",
        checkOut: "2025-04-13",
        nights: 2,
        rating: 4.96,
        reviewsCount: 128,
        pricePerNight: 28000,
        currency: "JPY",
        amenities: ["Tatami Living Area", "Private Zen Garden", "Hinoki Wood Bath"],
        imageUrl: "/images/machiya.svg",
        superhost: true,
      },
      {
        cardType: 'experience',
        id: "exp-zen-02",
        title: "Kyoto Zen & Temple Immersion",
        category: "Cultural Immersion",
        hostName: "Master Socho",
        durationMinutes: 90,
        groupSizeMax: 4,
        pricePerPerson: 7500,
        currency: "JPY",
        dayByDayPlan: [
          { day: 1, date: "2025-04-12", activity: "Arashiyama Bamboo & Tenryu-ji Meditation", time: "08:30 AM" },
          { day: 2, date: "2025-04-13", activity: "Private Gion Matcha Tea Ceremony", time: "10:00 AM" }
        ],
        imageUrl: "/images/zen.svg",
      },
      {
        cardType: 'food',
        id: "food-karyo-03",
        restaurantName: "Gion Karyo",
        cuisineType: "Kaiseki Dining",
        neighborhood: "Gion, Kyoto",
        priceTier: "$$",
        specialtyDish: "Seasonal 9-Course Kaiseki",
        accolades: ["Michelin Bib Gourmand", "Tabelog Top 100"],
        reservationSlot: "Saturday 12 Apr 2025, 7:30 PM Slot",
        imageUrl: "/images/karyo.svg",
      }
    ]
  },

  // Option 2: Arashiyama Nature & Bamboo Grove Retreat
  "arashiyama-nature": {
    tripId: "kyoto-arashiyama-nature",
    title: "Arashiyama Nature & Riverside Retreat",
    summary: "Riverside onsen ryokan, bamboo forest walking meditation, and handmade artisanal soba.",
    dates: { checkIn: "2025-04-11", checkOut: "2025-04-13", nights: 2 },
    items: [
      {
        cardType: 'stay',
        id: "stay-arashiyama-02",
        title: "Riverside Onsen Ryokan",
        propertyType: "Traditional Japanese Ryokan",
        location: "Arashiyama, Kyoto",
        checkIn: "2025-04-11",
        checkOut: "2025-04-13",
        nights: 2,
        rating: 4.92,
        reviewsCount: 94,
        pricePerNight: 34000,
        currency: "JPY",
        amenities: ["Natural Hot Springs", "River View Balcony", "Yukata Provided"],
        imageUrl: "/images/ryokan.svg",
        superhost: true,
      },
      {
        cardType: 'experience',
        id: "exp-bamboo-02",
        title: "Sagano Bamboo Grove Dawn Walk",
        category: "Nature & Mindfulness",
        hostName: "Kenji Tanaka",
        durationMinutes: 120,
        groupSizeMax: 6,
        pricePerPerson: 6200,
        currency: "JPY",
        dayByDayPlan: [
          { day: 1, date: "2025-04-12", activity: "Early Morning Sagano Bamboo Photography Walk", time: "07:00 AM" },
          { day: 2, date: "2025-04-13", activity: "Okochi Sanso Villa Garden Exploration", time: "09:30 AM" }
        ],
        imageUrl: "/images/zen.svg",
      },
      {
        cardType: 'food',
        id: "food-soba-02",
        restaurantName: "Arashiyama Yoshimura",
        cuisineType: "Artisanal Hand-Rolled Soba",
        neighborhood: "Togetsukyo Bridge, Arashiyama",
        priceTier: "$$",
        specialtyDish: "Ten-Seiro Soba with Seasonal Tempura",
        accolades: ["Michelin Bib Gourmand", "Kyoto Heritage Guild"],
        reservationSlot: "Saturday 12 Apr 2025, 7:00 PM Slot",
        imageUrl: "/images/soba.svg",
      }
    ]
  },

  // Option 3: Gion Historic Districts & Tea Craft (Demonstrates Empty Field Filler Line)
  "gion-tea": {
    tripId: "kyoto-gion-tea",
    title: "Gion Tea Craft & Hidden Alleyways",
    summary: "Secluded machiya loft with curated heritage tea workshop and local robata grill.",
    dates: { checkIn: "2025-04-11", checkOut: "2025-04-13", nights: 2 },
    items: [
      {
        cardType: 'stay',
        id: "stay-gion-loft-03",
        title: "Kamo River Designer Loft",
        propertyType: "Boutique Apartment",
        location: "Kamo Riverbank, Central Kyoto",
        checkIn: "2025-04-11",
        checkOut: "2025-04-13",
        nights: 2,
        rating: 4.88,
        reviewsCount: null, // DELIBERATELY EMPTY: tests filler line fallback ("—")
        pricePerNight: 24500,
        currency: "JPY",
        amenities: ["River View", "High-speed Wi-Fi", "Espresso Bar"],
        imageUrl: "/images/machiya.svg",
        superhost: false,
      },
      {
        cardType: 'experience',
        id: "exp-uji-tea-03",
        title: "Uji Heritage Green Tea Masterclass",
        category: "Gastronomic Craft",
        hostName: undefined, // DELIBERATELY EMPTY: tests filler line fallback ("—")
        durationMinutes: 75,
        groupSizeMax: 8,
        pricePerPerson: 5800,
        currency: "JPY",
        dayByDayPlan: [
          { day: 1, date: "2025-04-12", activity: "Rare Sencha & Gyokuro Sensory Cupping", time: "11:00 AM" },
          { day: 2, date: "2025-04-13", activity: "Whisking Ceremonial Matcha on Tatami", time: "02:00 PM" }
        ],
        imageUrl: "/images/zen.svg",
      },
      {
        cardType: 'food',
        id: "food-izakaya-03",
        restaurantName: "Chao Chao Kyoto",
        cuisineType: "Robata Charcoal & Gyoza",
        neighborhood: "Pontocho Alley, Kyoto",
        priceTier: "$$",
        specialtyDish: null, // DELIBERATELY EMPTY: tests filler line fallback ("—")
        accolades: ["Tabelog Bronze 2024"],
        reservationSlot: "Saturday 12 Apr 2025, 8:00 PM Slot",
        imageUrl: "/images/soba.svg",
      }
    ]
  }
};

// Default single row export containing one row from each sheet (Stays, Experiences, Food)
export const DEFAULT_WORKBOOK_THREE_ROWS = KYOTO_TRIP_PACKS["higashiyama-zen"].items;
