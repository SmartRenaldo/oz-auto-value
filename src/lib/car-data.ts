// src/lib/car-data.ts

export const carBrands = [
  { value: "toyota", label: "Toyota" },
  { value: "mazda", label: "Mazda" },
  { value: "hyundai", label: "Hyundai" },
  { value: "ford", label: "Ford" },
  { value: "holden", label: "Holden" },
  { value: "volkswagen", label: "Volkswagen" },
  { value: "subaru", label: "Subaru" },
  { value: "mitsubishi", label: "Mitsubishi" },
  { value: "kia", label: "Kia" },
  { value: "nissan", label: "Nissan" },
  { value: "honda", label: "Honda" },
  { value: "bmw", label: "BMW" },
  { value: "mercedes", label: "Mercedes-Benz" },
  { value: "audi", label: "Audi" },
  { value: "other", label: "Other" },
];

export const carModels: Record<string, string[]> = {
  toyota: [
    "Corolla",
    "Camry",
    "RAV4",
    "Hilux",
    "Yaris",
    "Prado",
    "Kluger",
    "Land Cruiser",
  ],
  mazda: ["Mazda3", "Mazda6", "CX-5", "CX-3", "CX-9", "BT-50", "MX-5"],
  hyundai: ["i30", "Tucson", "Santa Fe", "Kona", "Venue", "iLoad", "Accent"],
  ford: [
    "Ranger",
    "Focus",
    "Everest",
    "Escape",
    "Mustang",
    "Transit",
    "Endura",
  ],
  holden: [
    "Commodore",
    "Astra",
    "Colorado",
    "Trax",
    "Equinox",
    "Acadia",
    "Trailblazer",
  ],
  volkswagen: [
    "Golf",
    "Polo",
    "Tiguan",
    "Passat",
    "T-Cross",
    "Amarok",
    "Touareg",
  ],
  subaru: ["Forester", "Outback", "XV", "Impreza", "WRX", "Liberty", "BRZ"],
  mitsubishi: [
    "Triton",
    "ASX",
    "Outlander",
    "Pajero",
    "Eclipse Cross",
    "Mirage",
    "Pajero Sport",
  ],
  kia: [
    "Cerato",
    "Sportage",
    "Sorento",
    "Picanto",
    "Stinger",
    "Carnival",
    "Seltos",
  ],
  nissan: [
    "X-Trail",
    "Navara",
    "Qashqai",
    "Patrol",
    "Juke",
    "Pathfinder",
    "370Z",
  ],
  honda: ["Civic", "CR-V", "HR-V", "Accord", "Jazz", "Odyssey", "City"],
  bmw: ["3 Series", "5 Series", "X3", "X5", "1 Series", "X1", "7 Series"],
  mercedes: ["C-Class", "E-Class", "GLC", "A-Class", "GLA", "GLE", "S-Class"],
  audi: ["A3", "A4", "Q5", "Q3", "A1", "Q7", "A5"],
  other: ["Model S", "Model 3", "Prius", "Sonata", "Accent", "i20", "Elantra"],
};

// Function to generate a dynamic array of car years
// This will generate an array of years from the current year down to 30 years ago
export const generateCarYears = (yearsBack: number = 30): number[] => {
  const currentYear = new Date().getFullYear();
  // Include next year's models which are often released before the year begins
  const nextYear = currentYear + 1;

  // Create an array from next year (for new model releases) to 30 years back
  return Array.from({ length: yearsBack + 2 }, (_, i) => nextYear - i);
};

// Generate car years dynamically
export const carYears = generateCarYears();
