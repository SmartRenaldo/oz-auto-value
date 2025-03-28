// src/lib/types.ts

// Car brands
export type CarBrand =
  | "toyota"
  | "mazda"
  | "hyundai"
  | "ford"
  | "holden"
  | "volkswagen"
  | "subaru"
  | "mitsubishi"
  | "kia"
  | "nissan"
  | "honda"
  | "bmw"
  | "mercedes"
  | "audi"
  | "other";

// Car types
export type CarType =
  | "sedan"
  | "hatchback"
  | "suv"
  | "wagon"
  | "ute"
  | "van"
  | "convertible"
  | "coupe";

// Fuel types
export type FuelType = "petrol" | "diesel" | "hybrid" | "electric" | "lpg";

// Transmission types
export type TransmissionType = "automatic" | "manual" | "cvt";

// Car form data interface
export interface CarFormData {
  brand: CarBrand;
  model: string;
  year: number;
  type: CarType;
  transmission: TransmissionType;
  fuelType: FuelType;
  odometer: number;
  condition: "excellent" | "good" | "fair" | "poor";
  features: string[];
}

// Valuation result interface
export interface ValuationResult {
  estimatedPrice: number;
  priceRange: {
    min: number;
    max: number;
  };
  confidence: "high" | "medium" | "low";
  factors: {
    factor: string;
    impact: "positive" | "negative" | "neutral";
    description: string;
  }[];
  similarCars?: {
    model: string;
    year: number;
    price: number;
  }[];
}
