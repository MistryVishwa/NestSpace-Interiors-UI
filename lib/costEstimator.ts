import { z } from "zod";

// ==========================================
// TYPES & INTERFACES
// ==========================================

export type RoomTypeId =
  | "living-room"
  | "bedroom"
  | "kitchen"
  | "bathroom"
  | "office"
  | "dining-room"
  | "apartment";

export type StyleId =
  | "modern"
  | "minimal"
  | "luxury"
  | "scandinavian"
  | "industrial"
  | "classic";

export type MaterialId = "economy" | "standard" | "premium" | "luxury";

export type FurnitureId = "basic" | "standard" | "premium" | "custom";

export type AddonId =
  | "lighting"
  | "false-ceiling"
  | "smart-home"
  | "wall-panels"
  | "storage"
  | "decor";

export interface RoomTypeOption {
  id: RoomTypeId;
  name: string;
  description: string;
  baseRatePerSqFt: number; // in USD or local currency
  iconName: string;
  defaultLength: number;
  defaultWidth: number;
  defaultHeight: number;
  image: string;
}

export interface StyleOption {
  id: StyleId;
  name: string;
  description: string;
  multiplier: number;
  badge: string;
  tagline: string;
}

export interface MaterialOption {
  id: MaterialId;
  name: string;
  description: string;
  ratePerSqFt: number;
  features: string[];
  recommendedFor: string;
}

export interface FurnitureOption {
  id: FurnitureId;
  name: string;
  description: string;
  flatCost: number;
  perSqFtRate: number;
  inclusions: string[];
}

export interface AddonOption {
  id: AddonId;
  name: string;
  description: string;
  pricingType: "flat" | "per_sqft";
  price: number;
  iconName: string;
  popular?: boolean;
}

export interface PresetOption {
  id: string;
  name: string;
  description: string;
  badge: string;
  data: EstimatorFormData;
}

// ==========================================
// ZOD VALIDATION SCHEMA
// ==========================================

export const estimatorSchema = z.object({
  roomType: z.enum([
    "living-room",
    "bedroom",
    "kitchen",
    "bathroom",
    "office",
    "dining-room",
    "apartment",
  ] as const, {
    required_error: "Please select a room type",
  }),
  length: z.coerce
    .number({ invalid_type_error: "Length must be a number" })
    .min(5, "Length must be at least 5 ft")
    .max(100, "Length cannot exceed 100 ft"),
  width: z.coerce
    .number({ invalid_type_error: "Width must be a number" })
    .min(5, "Width must be at least 5 ft")
    .max(100, "Width cannot exceed 100 ft"),
  height: z.coerce
    .number({ invalid_type_error: "Height must be a number" })
    .min(7, "Height must be at least 7 ft")
    .max(20, "Height cannot exceed 20 ft"),
  style: z.enum([
    "modern",
    "minimal",
    "luxury",
    "scandinavian",
    "industrial",
    "classic",
  ] as const, {
    required_error: "Please select a design style",
  }),
  material: z.enum(["economy", "standard", "premium", "luxury"] as const, {
    required_error: "Please select a material tier",
  }),
  furniturePackage: z.enum(["basic", "standard", "premium", "custom"] as const, {
    required_error: "Please select a furniture package",
  }),
  addons: z.array(z.string()).default([]),
  budgetPreference: z.coerce
    .number({ invalid_type_error: "Budget must be a number" })
    .min(500, "Minimum budget preference is $500")
    .max(1000000, "Budget exceeds allowed maximum"),
});

export type EstimatorFormData = z.infer<typeof estimatorSchema>;

// ==========================================
// PRICING DATA CONFIGURATION
// ==========================================

export const ROOM_TYPES: RoomTypeOption[] = [
  {
    id: "living-room",
    name: "Living Room",
    description: "Spacious central living area with seating, media, and ambient lighting.",
    baseRatePerSqFt: 35,
    iconName: "Sofa",
    defaultLength: 18,
    defaultWidth: 14,
    defaultHeight: 9,
    image: "/images/portfolio-1.jpg",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    description: "Relaxing sanctuary with wardrobe, bedding setup, and acoustic comfort.",
    baseRatePerSqFt: 30,
    iconName: "Bed",
    defaultLength: 14,
    defaultWidth: 12,
    defaultHeight: 9,
    image: "/images/portfolio-2.jpg",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    description: "Modular cabinetry, durable countertops, plumbing, and task lighting.",
    baseRatePerSqFt: 55,
    iconName: "Utensils",
    defaultLength: 12,
    defaultWidth: 10,
    defaultHeight: 9,
    image: "/images/portfolio-3.jpg",
  },
  {
    id: "bathroom",
    name: "Bathroom",
    description: "Waterproof tiling, sanitaryware, vanity unit, and ambient fixtures.",
    baseRatePerSqFt: 45,
    iconName: "Bath",
    defaultLength: 10,
    defaultWidth: 8,
    defaultHeight: 9,
    image: "/images/portfolio-4.jpg",
  },
  {
    id: "office",
    name: "Home Office",
    description: "Ergonomic desk area, built-in shelving, cable routing, and video lighting.",
    baseRatePerSqFt: 32,
    iconName: "Briefcase",
    defaultLength: 12,
    defaultWidth: 10,
    defaultHeight: 9,
    image: "/images/portfolio-5.jpg",
  },
  {
    id: "dining-room",
    name: "Dining Room",
    description: "Feature chandelier, dining set integration, storage sideboard, and accent wall.",
    baseRatePerSqFt: 34,
    iconName: "UtensilsCrossed",
    defaultLength: 14,
    defaultWidth: 12,
    defaultHeight: 9,
    image: "/images/portfolio-6.jpg",
  },
  {
    id: "apartment",
    name: "Entire Apartment",
    description: "Comprehensive multi-room interior makeover tailored for cohesive luxury living.",
    baseRatePerSqFt: 40,
    iconName: "Building2",
    defaultLength: 30,
    defaultWidth: 25,
    defaultHeight: 9,
    image: "/images/hero-interior.jpg",
  },
];

export const STYLES: StyleOption[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean lines, neutral base tones with sleek metal and stone accents.",
    multiplier: 1.0,
    badge: "Most Popular",
    tagline: "Sleek & Contemporary",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Understated elegance, uncluttered layouts, and functional harmony.",
    multiplier: 0.9,
    badge: "Cost-Effective",
    tagline: "Pure & Uncluttered",
  },
  {
    id: "luxury",
    name: "Luxury",
    description: "Custom brass detailing, exotic marble, rich velvet, and bespoke carpentry.",
    multiplier: 1.5,
    badge: "High-End",
    tagline: "Bespoke & Opulent",
  },
  {
    id: "scandinavian",
    name: "Scandinavian",
    description: "Light woods, cozy hygge textures, organic soft tones, and airy brightness.",
    multiplier: 1.1,
    badge: "Cozy Aesthetic",
    tagline: "Warm & Light",
  },
  {
    id: "industrial",
    name: "Industrial",
    description: "Exposed architectural elements, raw metal work, reclaimed timber, and Edison glow.",
    multiplier: 1.2,
    badge: "Edgy Urban",
    tagline: "Raw & Structural",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Timeless wainscoting, crown moldings, ornate wood finishes, and rich fabrics.",
    multiplier: 1.35,
    badge: "Timeless Heritage",
    tagline: "Ornate & Elegant",
  },
];

export const MATERIALS: MaterialOption[] = [
  {
    id: "economy",
    name: "Economy",
    description: "Quality laminate finishes, standard hardware, durable commercial paint.",
    ratePerSqFt: 15,
    features: ["Commercial grade laminate", "Standard Soft-close hinges", "VOC-compliant latex paint"],
    recommendedFor: "Rental properties & budget revamps",
  },
  {
    id: "standard",
    name: "Standard",
    description: "HDMR wood base, acrylic finishes, Blum concealed hardware, premium paint.",
    ratePerSqFt: 25,
    features: ["Boiler-grade HDMR substrate", "Anti-fingerprint acrylic laminates", "Blum soft-close hardware"],
    recommendedFor: "Primary family residences",
  },
  {
    id: "premium",
    name: "Premium",
    description: "Natural wood veneers, quartz stone surfaces, Hafele architectural fittings.",
    ratePerSqFt: 40,
    features: ["Hand-selected natural wood veneer", "Engineered quartz countertops", "Hafele German architectural fittings"],
    recommendedFor: "Luxury homes seeking refine texture",
  },
  {
    id: "luxury",
    name: "Luxury",
    description: "Italian marble, solid teak framing, imported metallic lacquers, artisan brass work.",
    ratePerSqFt: 65,
    features: ["Imported Calacatta/Carrara marble", "Solid teakwood framing & joinery", "Bespoke PVD metal accents"],
    recommendedFor: "Ultra-luxury penthouses & estates",
  },
];

export const FURNITURE_PACKAGES: FurnitureOption[] = [
  {
    id: "basic",
    name: "Basic Package",
    description: "Essential functional furniture items (bed/sofa + basic storage).",
    flatCost: 1500,
    perSqFtRate: 5,
    inclusions: ["Primary seating/bed unit", "Basic storage module", "Standard coffee table / side table"],
  },
  {
    id: "standard",
    name: "Standard Package",
    description: "Complete room furnishing with matching modern decor pieces.",
    flatCost: 3200,
    perSqFtRate: 10,
    inclusions: [
      "Modular sofa / king bed",
      "Full height wardrobe or media console",
      "Accent chairs & dining / side tables",
      "Matching area rug",
    ],
  },
  {
    id: "premium",
    name: "Premium Package",
    description: "Custom upholstered designer furniture with ergonomic engineering.",
    flatCost: 5800,
    perSqFtRate: 18,
    inclusions: [
      "Custom designer sofa/bed in performance fabric",
      "Integrated smart storage & dressing vanity",
      "Designer accent furniture & task lighting",
      "Handmade wool rug & window treatments",
    ],
  },
  {
    id: "custom",
    name: "Custom Bespoke",
    description: "Fully handcrafted one-of-a-kind furniture tailored to exact architectural scale.",
    flatCost: 9500,
    perSqFtRate: 28,
    inclusions: [
      "100% custom artisan woodworking",
      "Imported Italian leather / velvet upholstery",
      "Motorized window drapery & bespoke joinery",
      "Curated art & sculptor styling",
    ],
  },
];

export const ADDONS: AddonOption[] = [
  {
    id: "lighting",
    name: "Architectural Lighting Package",
    description: "COB spotlights, magnetic track lights, LED strip alcove lighting & dimmers.",
    pricingType: "per_sqft",
    price: 8,
    iconName: "Zap",
    popular: true,
  },
  {
    id: "false-ceiling",
    name: "Designer False Ceiling",
    description: "Gypsum board layered ceiling with indirect cove lighting channels.",
    pricingType: "per_sqft",
    price: 12,
    iconName: "Layers",
    popular: true,
  },
  {
    id: "smart-home",
    name: "Smart Home Automation",
    description: "App & voice-controlled smart switches, motorized blinds, mood scenes & sensors.",
    pricingType: "flat",
    price: 1800,
    iconName: "Cpu",
    popular: false,
  },
  {
    id: "wall-panels",
    name: "Feature Wall Paneling",
    description: "Acoustic wood fluted panels, upholstered headboard wall, or stone veneer accent.",
    pricingType: "per_sqft",
    price: 14,
    iconName: "LayoutGrid",
    popular: false,
  },
  {
    id: "storage",
    name: "Custom Built-in Storage",
    description: "Floor-to-ceiling concealed cabinetry with soft-close pullout organizers.",
    pricingType: "flat",
    price: 2400,
    iconName: "Box",
    popular: false,
  },
  {
    id: "decor",
    name: "Styling & Art Curation",
    description: "Curated wall art, decorative vases, indoor plants, and soft furnishings.",
    pricingType: "flat",
    price: 950,
    iconName: "Palette",
    popular: true,
  },
];

export const PRESETS: PresetOption[] = [
  {
    id: "cozy-bedroom",
    name: "Cozy Master Suite",
    description: "Modern bedroom design with premium finishes and architectural lighting.",
    badge: "Popular Pick",
    data: {
      roomType: "bedroom",
      length: 16,
      width: 14,
      height: 9,
      style: "modern",
      material: "standard",
      furniturePackage: "standard",
      addons: ["lighting", "false-ceiling"],
      budgetPreference: 18000,
    },
  },
  {
    id: "luxury-living",
    name: "Opulent Living Room",
    description: "Spacious luxury living room with high-end materials and custom furniture.",
    badge: "High-End",
    data: {
      roomType: "living-room",
      length: 22,
      width: 16,
      height: 10,
      style: "luxury",
      material: "premium",
      furniturePackage: "premium",
      addons: ["lighting", "false-ceiling", "smart-home", "wall-panels"],
      budgetPreference: 45000,
    },
  },
  {
    id: "chef-kitchen",
    name: "Gourmet Kitchen",
    description: "Modular kitchen with heavy-duty materials, smart storage, and task lights.",
    badge: "Best Value",
    data: {
      roomType: "kitchen",
      length: 14,
      width: 12,
      height: 9,
      style: "minimal",
      material: "premium",
      furniturePackage: "standard",
      addons: ["lighting", "storage"],
      budgetPreference: 22000,
    },
  },
];

// ==========================================
// CALCULATION RESULTS INTERFACES
// ==========================================

export interface CostBreakdownCategory {
  key: string;
  label: string;
  amount: number;
  percentage: number;
  description: string;
  color: string; // Tailored color code for SVG chart
}

export interface BudgetRecommendation {
  status: "under_budget" | "within_budget" | "over_budget";
  difference: number;
  title: string;
  message: string;
  suggestions: string[];
}

export interface CalculationResult {
  areaSqFt: number;
  volumeCuFt: number;
  baseCost: number;
  materialCost: number;
  furnitureCost: number;
  addonCost: number;
  subtotal: number;
  taxAmount: number;
  taxRate: number; // e.g. 0.18 for 18%
  grandTotal: number;
  breakdown: CostBreakdownCategory[];
  estimatedTimelineWeeks: {
    min: number;
    max: number;
    formatted: string;
  };
  recommendation: BudgetRecommendation;
  selectedRoom: RoomTypeOption;
  selectedStyle: StyleOption;
  selectedMaterial: MaterialOption;
  selectedFurniture: FurnitureOption;
  selectedAddons: AddonOption[];
}

// ==========================================
// CALCULATOR FUNCTION
// ==========================================

export function calculateEstimate(data: EstimatorFormData): CalculationResult {
  const room = ROOM_TYPES.find((r) => r.id === data.roomType) || ROOM_TYPES[0];
  const style = STYLES.find((s) => s.id === data.style) || STYLES[0];
  const material = MATERIALS.find((m) => m.id === data.material) || MATERIALS[0];
  const furniture = FURNITURE_PACKAGES.find((f) => f.id === data.furniturePackage) || FURNITURE_PACKAGES[0];

  const selectedAddons = ADDONS.filter((a) => data.addons.includes(a.id));

  // Area & Volume
  const areaSqFt = Math.round(data.length * data.width);
  const volumeCuFt = Math.round(areaSqFt * data.height);

  // Cost calculations
  const rawBaseCost = areaSqFt * room.baseRatePerSqFt;
  const baseCost = Math.round(rawBaseCost * style.multiplier);

  const materialCost = Math.round(areaSqFt * material.ratePerSqFt);

  const furnitureCost = Math.round(furniture.flatCost + areaSqFt * furniture.perSqFtRate);

  let addonCost = 0;
  selectedAddons.forEach((addon) => {
    if (addon.pricingType === "per_sqft") {
      addonCost += areaSqFt * addon.price;
    } else {
      addonCost += addon.price;
    }
  });
  addonCost = Math.round(addonCost);

  const subtotal = baseCost + materialCost + furnitureCost + addonCost;
  const taxRate = 0.18; // 18% mock taxes / GST
  const taxAmount = Math.round(subtotal * taxRate);
  const grandTotal = subtotal + taxAmount;

  // Percentage breakdown
  const breakdown: CostBreakdownCategory[] = [
    {
      key: "base",
      label: "Architectural & Base Labor",
      amount: baseCost,
      percentage: Math.round((baseCost / grandTotal) * 100),
      description: `Core structural work & layout (${room.name} @ ${style.name} style)`,
      color: "oklch(0.45 0.12 60)", // Primary Bronze Gold
    },
    {
      key: "materials",
      label: "Materials & Finishes",
      amount: materialCost,
      percentage: Math.round((materialCost / grandTotal) * 100),
      description: `${material.name} tier wood, wall, and floor surface finishes`,
      color: "oklch(0.55 0.14 55)", // Accent Gold
    },
    {
      key: "furniture",
      label: "Furniture & Fitting Package",
      amount: furnitureCost,
      percentage: Math.round((furnitureCost / grandTotal) * 100),
      description: `${furniture.name} tailored for ${areaSqFt} sq ft space`,
      color: "oklch(0.35 0.08 55)", // Darker Warm Brown
    },
    {
      key: "addons",
      label: "Selected Add-ons",
      amount: addonCost,
      percentage: Math.round((addonCost / grandTotal) * 100),
      description: `${selectedAddons.length} optional enhance feature(s)`,
      color: "oklch(0.65 0.1 75)", // Light Warm Sand
    },
    {
      key: "taxes",
      label: "Estimated Tax & Permitting (18%)",
      amount: taxAmount,
      percentage: Math.round((taxAmount / grandTotal) * 100),
      description: "Standard statutory taxes & compliance estimation",
      color: "oklch(0.25 0.05 50)", // Deep Muted Charcoal
    },
  ];

  // Timeline calculation
  let minWeeks = 3;
  let maxWeeks = 5;

  if (areaSqFt > 300) {
    minWeeks += 1;
    maxWeeks += 2;
  }
  if (areaSqFt > 600) {
    minWeeks += 2;
    maxWeeks += 3;
  }
  if (material.id === "premium" || material.id === "luxury") {
    minWeeks += 1;
    maxWeeks += 2;
  }
  if (furniture.id === "custom") {
    minWeeks += 1;
    maxWeeks += 2;
  }

  const estimatedTimelineWeeks = {
    min: minWeeks,
    max: maxWeeks,
    formatted: `${minWeeks} - ${maxWeeks} Weeks`,
  };

  // Budget Recommendation Analysis
  const budget = data.budgetPreference;
  const diff = budget - grandTotal;
  let status: "under_budget" | "within_budget" | "over_budget" = "within_budget";
  let title = "Great Fit!";
  let message = "Your estimated cost aligns well with your targeted budget preference.";
  const suggestions: string[] = [];

  const tolerance = budget * 0.08; // 8% buffer

  if (diff < -tolerance) {
    status = "over_budget";
    title = "Slightly Over Preferred Budget";
    const overAmt = Math.abs(diff);
    message = `The current total estimate exceeds your $${budget.toLocaleString()} target by approximately $${overAmt.toLocaleString()}.`;
    suggestions.push(
      `Consider switching material level from "${material.name}" to "${
        material.id === "luxury"
          ? "Premium"
          : material.id === "premium"
          ? "Standard"
          : "Economy"
      }" to save up to 25%.`
    );
    if (selectedAddons.length > 0) {
      suggestions.push("You can optimize add-ons or phase them into a post-handover upgrade.");
    }
    if (style.multiplier > 1.1) {
      suggestions.push(`Choosing Modern or Minimal style can lower base costs by 15-30%.`);
    }
  } else if (diff > tolerance) {
    status = "under_budget";
    title = "Well Under Your Budget!";
    message = `Your estimate comes in $${diff.toLocaleString()} under your maximum budget limit.`;
    suggestions.push(
      "You have room to upgrade to a higher Material level or add Smart Home automation."
    );
    suggestions.push("Consider upgrading your furniture package to Custom Bespoke.");
  } else {
    status = "within_budget";
    title = "Perfect Budget Alignment";
    message = `Your estimate matches your target budget within a healthy margin.`;
    suggestions.push("Your selected tier balances quality, longevity, and cost efficiency.");
    suggestions.push("Book a consultation with our design architects to lock in this estimate.");
  }

  return {
    areaSqFt,
    volumeCuFt,
    baseCost,
    materialCost,
    furnitureCost,
    addonCost,
    subtotal,
    taxAmount,
    taxRate,
    grandTotal,
    breakdown,
    estimatedTimelineWeeks,
    recommendation: {
      status,
      difference: diff,
      title,
      message,
      suggestions,
    },
    selectedRoom: room,
    selectedStyle: style,
    selectedMaterial: material,
    selectedFurniture: furniture,
    selectedAddons,
  };
}

// ==========================================
// FORMATTING HELPERS
// ==========================================

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
