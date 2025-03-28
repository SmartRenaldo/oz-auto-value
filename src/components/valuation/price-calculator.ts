// src/components/valuation/price-calculator.ts
import type { CarFormData, ValuationResult } from "@/lib/types";

export function calculateCarPrice(data: CarFormData): ValuationResult {
  // Model-specific base prices (in AUD, reflecting different series/models within brands)
  const modelBasePrices: Record<string, Record<string, number>> = {
    toyota: {
      Corolla: 25000,
      Camry: 32000,
      RAV4: 38000,
      Hilux: 45000,
      Yaris: 20000,
      Prado: 65000,
      Kluger: 50000,
      "Land Cruiser": 80000,
      default: 28000,
    },
    mazda: {
      Mazda3: 25000,
      Mazda6: 35000,
      "CX-5": 38000,
      "CX-3": 28000,
      "CX-9": 55000,
      "BT-50": 45000,
      "MX-5": 38000,
      default: 25000,
    },
    hyundai: {
      i30: 23000,
      Tucson: 35000,
      "Santa Fe": 45000,
      Kona: 28000,
      Venue: 25000,
      iLoad: 35000,
      Accent: 18000,
      default: 22000,
    },
    ford: {
      Ranger: 50000,
      Focus: 25000,
      Everest: 55000,
      Escape: 32000,
      Mustang: 65000,
      Transit: 40000,
      Endura: 45000,
      default: 24000,
    },
    holden: {
      Commodore: 30000,
      Astra: 22000,
      Colorado: 42000,
      Trax: 25000,
      Equinox: 30000,
      Acadia: 45000,
      Trailblazer: 42000,
      default: 20000,
    },
    volkswagen: {
      Golf: 32000,
      Polo: 25000,
      Tiguan: 42000,
      Passat: 38000,
      "T-Cross": 30000,
      Amarok: 55000,
      Touareg: 75000,
      default: 32000,
    },
    subaru: {
      Forester: 35000,
      Outback: 40000,
      XV: 30000,
      Impreza: 25000,
      WRX: 45000,
      Liberty: 35000,
      BRZ: 38000,
      default: 26000,
    },
    mitsubishi: {
      Triton: 42000,
      ASX: 25000,
      Outlander: 35000,
      Pajero: 50000,
      "Eclipse Cross": 30000,
      Mirage: 18000,
      "Pajero Sport": 45000,
      default: 23000,
    },
    kia: {
      Cerato: 25000,
      Sportage: 35000,
      Sorento: 45000,
      Picanto: 18000,
      Stinger: 55000,
      Carnival: 45000,
      Seltos: 28000,
      default: 21500,
    },
    nissan: {
      "X-Trail": 35000,
      Navara: 45000,
      Qashqai: 30000,
      Patrol: 75000,
      Juke: 25000,
      Pathfinder: 50000,
      "370Z": 60000,
      default: 23500,
    },
    honda: {
      Civic: 28000,
      "CR-V": 35000,
      "HR-V": 28000,
      Accord: 35000,
      Jazz: 20000,
      Odyssey: 45000,
      City: 22000,
      default: 26000,
    },
    bmw: {
      "3 Series": 65000,
      "5 Series": 85000,
      X3: 70000,
      X5: 95000,
      "1 Series": 50000,
      X1: 55000,
      "7 Series": 120000,
      default: 58000,
    },
    mercedes: {
      "C-Class": 65000,
      "E-Class": 90000,
      GLC: 75000,
      "A-Class": 50000,
      GLA: 55000,
      GLE: 105000,
      "S-Class": 150000,
      default: 65000,
    },
    audi: {
      A3: 50000,
      A4: 65000,
      Q5: 75000,
      Q3: 60000,
      A1: 40000,
      Q7: 100000,
      A5: 75000,
      default: 55000,
    },
    other: {
      "Model S": 120000,
      "Model 3": 75000,
      default: 20000,
    },
  };

  // Get base price for the selected brand and model
  let basePrice = 25000; // Default fallback

  if (modelBasePrices[data.brand]) {
    const brandPrices = modelBasePrices[data.brand];
    // Use the specific model price if available, otherwise use the default price for the brand
    basePrice = brandPrices[data.model] || brandPrices["default"];
  }

  // Depreciation rates by brand (annual percentage depreciation)
  const brandDepreciationRates: Record<string, number> = {
    toyota: 0.045, // Toyota has excellent resale value, low depreciation
    mazda: 0.05,
    hyundai: 0.06,
    ford: 0.055,
    holden: 0.07, // Higher depreciation as the brand is discontinued
    volkswagen: 0.055,
    subaru: 0.05,
    mitsubishi: 0.06,
    kia: 0.055,
    nissan: 0.055,
    honda: 0.05,
    bmw: 0.07, // Luxury brands often depreciate faster
    mercedes: 0.065,
    audi: 0.07,
    other: 0.06,
  };

  // Model type depreciation modifiers (multiplied by brand rate)
  const modelTypeDepreciationModifiers: Record<string, number> = {
    sedan: 1.0,
    hatchback: 0.95,
    suv: 0.9, // SUVs tend to hold value better
    wagon: 1.05,
    ute: 0.85, // Utility vehicles depreciate slower in Australia
    van: 1.0,
    convertible: 1.1, // Convertibles often depreciate faster
    coupe: 1.05,
  };

  // Get the base depreciation rate for the brand
  const baseBrandDepreciation = brandDepreciationRates[data.brand] || 0.06;

  // Apply the model type modifier
  const annualDepreciationRate =
    baseBrandDepreciation * (modelTypeDepreciationModifiers[data.type] || 1.0);

  // Calculate age-based depreciation with a more realistic curve
  const currentYear = new Date().getFullYear();
  const ageInYears = currentYear - data.year;

  // First year has the steepest depreciation, then it gradually slows
  let yearFactor = 1.0;
  if (ageInYears > 0) {
    // Different calculation for first year vs subsequent years
    const firstYearDepreciation = annualDepreciationRate * 2; // First year has roughly double depreciation
    const remainingYearsDepreciation =
      (ageInYears - 1) * annualDepreciationRate;
    yearFactor = Math.max(
      1 - (firstYearDepreciation + remainingYearsDepreciation),
      0.3
    );
  }

  // Adjust for mileage (lower mileage is worth more)
  // Using a more gradual curve based on expected mileage per year
  const expectedAnnualKm = 15000;
  const expectedTotalKm = expectedAnnualKm * Math.max(ageInYears, 1);
  const mileageRatio = data.odometer / expectedTotalKm;

  let mileageFactor = 1.0;
  if (mileageRatio < 0.7) {
    // Below average mileage - positive adjustment
    mileageFactor = 1.0 + (0.7 - mileageRatio) * 0.1;
  } else if (mileageRatio > 1.2) {
    // Above average mileage - negative adjustment
    mileageFactor = 1.0 - (mileageRatio - 1.2) * 0.15;
  }

  // Ensure the mileage factor stays within reasonable bounds
  mileageFactor = Math.max(Math.min(mileageFactor, 1.15), 0.7);

  // Calculate estimated price
  let estimatedPrice =
    basePrice * Math.max(yearFactor, 0.3) * Math.max(mileageFactor, 0.7);

  // Adjust for condition
  const conditionMultipliers: Record<string, number> = {
    excellent: 1.2,
    good: 1.0,
    fair: 0.85,
    poor: 0.7,
  };
  estimatedPrice *= conditionMultipliers[data.condition];

  // Apply feature adjustments
  if (data.features && data.features.length > 0) {
    // Each feature adds about 2% to the value, up to a maximum of 15%
    const featureBonus = Math.min(data.features.length * 0.02, 0.15);
    estimatedPrice *= 1 + featureBonus;
  }

  // Calculate price range
  const priceRange = {
    min: Math.round(estimatedPrice * 0.9),
    max: Math.round(estimatedPrice * 1.1),
  };

  // Round the estimated price
  estimatedPrice = Math.round(estimatedPrice);

  // Generate valuation factors
  const factors = [
    {
      factor: "Vehicle Age",
      impact:
        data.year > currentYear - 5
          ? "positive"
          : data.year > currentYear - 10
          ? "neutral"
          : "negative",
      description: `Your ${data.year} vehicle is ${
        currentYear - data.year
      } years old.`,
    } as const,
    {
      factor: "Mileage",
      impact:
        data.odometer < 50000
          ? "positive"
          : data.odometer < 100000
          ? "neutral"
          : "negative",
      description: `Odometer reading of ${data.odometer.toLocaleString()} km.`,
    } as const,
    {
      factor: "Condition",
      impact:
        data.condition === "excellent" || data.condition === "good"
          ? "positive"
          : "negative",
      description: `Vehicle in ${data.condition} condition.`,
    } as const,
    {
      factor: "Features",
      impact:
        data.features.length > 5
          ? "positive"
          : data.features.length > 2
          ? "neutral"
          : "negative",
      description:
        data.features.length > 0
          ? `Vehicle has ${data.features.length} premium features.`
          : "No premium features selected.",
    } as const,
  ];

  // Set confidence level based on data completeness
  let confidence: "high" | "medium" | "low" = "medium";
  if (
    data.condition === "excellent" &&
    data.odometer < 100000 &&
    data.features.length > 3
  ) {
    confidence = "high";
  } else if (data.condition === "poor" || data.odometer > 200000) {
    confidence = "low";
  }

  return {
    estimatedPrice,
    priceRange,
    confidence,
    factors,
  };
}
