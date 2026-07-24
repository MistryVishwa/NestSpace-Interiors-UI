export interface ColorSwatch {
  name: string
  hex: string
}

export interface CompareProject {
  id: string
  slug: string
  title: string
  roomType: string
  style: string
  budgetRange: string
  estimatedCostNum: number
  materials: string[]
  colorPalette: ColorSwatch[]
  area: string
  areaSqFt: number
  furniture: string[]
  highlights: string[]
  coverImage: string
  galleryImages: string[]
  designer: string
  duration: string
  location: string
}

export interface PresetComparison {
  id: string
  title: string
  projectASlug: string
  projectBSlug: string
  description: string
  tag: string
}

export const COMPARE_PROJECTS: CompareProject[] = [
  {
    id: "proj-1",
    slug: "modern-living-room",
    title: "Modern Living Room",
    roomType: "Living Room",
    style: "Contemporary Minimalist",
    budgetRange: "$25,000 - $35,000",
    estimatedCostNum: 30000,
    area: "850 sq ft",
    areaSqFt: 850,
    designer: "Elena Rostova",
    duration: "6 weeks",
    location: "Manhattan, NY",
    coverImage: "/images/portfolio-1.jpg",
    galleryImages: [
      "/images/portfolio-1.jpg",
      "/images/portfolio-5.jpg",
      "/images/hero-interior.jpg",
      "/images/portfolio-6.jpg",
    ],
    materials: [
      "Solid White Oak",
      "Carrara Marble",
      "Brushed Brass",
      "Bouclé Fabric",
      "Architectural Glass",
    ],
    colorPalette: [
      { name: "Warm Slate", hex: "#4A5568" },
      { name: "Soft Cream", hex: "#F7FAFC" },
      { name: "Brass Accent", hex: "#D69E2E" },
      { name: "Muted Olive", hex: "#556B2F" },
    ],
    furniture: [
      "Custom L-Shaped Sectional Sofa",
      "Fluted Marble Coffee Table",
      "Integrated Floating Wall Unit",
      "Ergonomic Bouclé Lounge Chair",
      "Low-Profile Media Console",
    ],
    highlights: [
      "Hidden LED Linear Cove Lighting",
      "Acoustic Wood Slat Wall Panels",
      "Motorized Solar Shade System",
      "Custom Built-in Bookcase with Desk Integration",
    ],
  },
  {
    id: "proj-2",
    slug: "luxury-kitchen",
    title: "Luxury Chef Kitchen",
    roomType: "Kitchen",
    style: "Modern Luxury",
    budgetRange: "$55,000 - $75,000",
    estimatedCostNum: 65000,
    area: "400 sq ft",
    areaSqFt: 400,
    designer: "Marcus Vance",
    duration: "8 weeks",
    location: "Beverly Hills, CA",
    coverImage: "/images/portfolio-2.jpg",
    galleryImages: [
      "/images/portfolio-2.jpg",
      "/images/portfolio-5.jpg",
      "/images/portfolio-4.jpg",
      "/images/hero-interior.jpg",
    ],
    materials: [
      "Calacatta Gold Marble",
      "Smoked Walnut Cabinetry",
      "Polished Copper Fixtures",
      "Quartzite Backsplash",
      "Stainless Steel Hardware",
    ],
    colorPalette: [
      { name: "Midnight Espresso", hex: "#2D2623" },
      { name: "Calacatta Gold", hex: "#F5F2EB" },
      { name: "Warm Copper", hex: "#B87333" },
      { name: "Charcoal Slate", hex: "#3A3F47" },
    ],
    furniture: [
      "Waterfall Edge Marble Island",
      "Custom Barstools with Brass Legs",
      "Integrated Appliance Cabinetry",
      "Walk-in Pantry Shelving System",
      "Wine Collector Display Cellar",
    ],
    highlights: [
      "Sub-Zero & Wolf Commercial Suite",
      "Touchless Touch-Activated Faucets",
      "Under-Cabinet Dimmable Task Lights",
      "Hidden Trash & Compost Recycling Hub",
    ],
  },
  {
    id: "proj-3",
    slug: "executive-office",
    title: "Executive Penthouse Suite",
    roomType: "Office",
    style: "Industrial Chic & Executive",
    budgetRange: "$40,000 - $60,000",
    estimatedCostNum: 50000,
    area: "1,200 sq ft",
    areaSqFt: 1200,
    designer: "Sophia Chen",
    duration: "10 weeks",
    location: "Chicago, IL",
    coverImage: "/images/portfolio-3.jpg",
    galleryImages: [
      "/images/portfolio-3.jpg",
      "/images/about-hero.jpg",
      "/images/portfolio-6.jpg",
      "/images/hero-interior.jpg",
    ],
    materials: [
      "Reclaimed Barn Walnut",
      "Black Anodized Aluminum",
      "Full-Grain Top Leather",
      "Soundproof Double Glass",
      "Polished Concrete Tile",
    ],
    colorPalette: [
      { name: "Deep Onyx", hex: "#1A202C" },
      { name: "Cognac Leather", hex: "#9C4221" },
      { name: "Industrial Steel", hex: "#718096" },
      { name: "Warm Amber", hex: "#D69E2E" },
    ],
    furniture: [
      "Motorized Standing Walnut Desk",
      "Hermes Leather Executive Chair",
      "8-Person Modular Conference Table",
      "Acoustic Lounge Armchairs",
      "Full-Height Credenza Storage",
    ],
    highlights: [
      "Motorized Acoustic Glass Partition Wall",
      "Integrated 85\" Video Conference Display",
      "Private Espresso & Refreshment Bar",
      "Biophilic Air-Purifying Moss Feature Wall",
    ],
  },
  {
    id: "proj-4",
    slug: "spa-bathroom",
    title: "Zen Spa Sanctuary",
    roomType: "Bathroom",
    style: "Zen Spa & Biophilic",
    budgetRange: "$30,000 - $45,000",
    estimatedCostNum: 37500,
    area: "250 sq ft",
    areaSqFt: 250,
    designer: "Aria Takahashi",
    duration: "5 weeks",
    location: "Miami, FL",
    coverImage: "/images/portfolio-4.jpg",
    galleryImages: [
      "/images/portfolio-4.jpg",
      "/images/portfolio-6.jpg",
      "/images/hero-interior.jpg",
      "/images/portfolio-1.jpg",
    ],
    materials: [
      "Honed Basalt Stone",
      "Teak Wood Slat Flooring",
      "Frosted Privacy Glass",
      "Matte Black Hardware",
      "Terrazzo Composite",
    ],
    colorPalette: [
      { name: "Basalt Charcoal", hex: "#2A2D34" },
      { name: "Warm Teak", hex: "#8D5B4C" },
      { name: "Zen Sage", hex: "#8A9A86" },
      { name: "Pure Sand", hex: "#EAE6DF" },
    ],
    furniture: [
      "Freestanding Resin Soak Tub",
      "Floating Double Teak Vanity",
      "Frameless Heated LED Mirror",
      "Cedar Sauna Benches",
      "Storage Niche with Bamboo Accents",
    ],
    highlights: [
      "Thermostatic Steam Shower System",
      "Radiant Heated Porcelain Tile Floors",
      "Integrated Aromatherapy Diffuser Controls",
      "Rainfall Ceiling Showerhead with Chromatherapy",
    ],
  },
  {
    id: "proj-5",
    slug: "elegant-dining",
    title: "Grand Dining Parlor",
    roomType: "Dining Room",
    style: "Neo-Classical Elegance",
    budgetRange: "$35,000 - $50,000",
    estimatedCostNum: 42500,
    area: "300 sq ft",
    areaSqFt: 300,
    designer: "Julian Vance",
    duration: "4 weeks",
    location: "San Francisco, CA",
    coverImage: "/images/portfolio-5.jpg",
    galleryImages: [
      "/images/portfolio-5.jpg",
      "/images/portfolio-1.jpg",
      "/images/hero-interior.jpg",
      "/images/portfolio-2.jpg",
    ],
    materials: [
      "Smoked Glass",
      "Ebonized Ash Wood",
      "Champagne Gold Trim",
      "Velvet Upholstery",
      "Travertine Stone Base",
    ],
    colorPalette: [
      { name: "Champagne Gold", hex: "#D4AF37" },
      { name: "Royal Velvet Blue", hex: "#1A365D" },
      { name: "Ebonized Ash", hex: "#171923" },
      { name: "Warm Cream", hex: "#EDF2F7" },
    ],
    furniture: [
      "Extendable 12-Seat Ebonized Dining Table",
      "Custom Velvet High-Back Dining Chairs",
      "Hand-Blown Glass Chandelier",
      "Mirrored Wine Buffet Sideboard",
      "Architectural Display Console",
    ],
    highlights: [
      "Smart Mood Scene Lighting Control",
      "Custom Hand-Painted Ceiling Mural Accent",
      "Climate-Controlled Built-in Wine Cabinet",
      "Sound-Softening Velvet Wall Drapery",
    ],
  },
  {
    id: "proj-6",
    slug: "penthouse-living",
    title: "Urban Skyline Penthouse",
    roomType: "Living Room",
    style: "Urban High-End Luxury",
    budgetRange: "$120,000 - $180,000",
    estimatedCostNum: 150000,
    area: "3,500 sq ft",
    areaSqFt: 3500,
    designer: "Elena Rostova",
    duration: "16 weeks",
    location: "New York, NY",
    coverImage: "/images/portfolio-6.jpg",
    galleryImages: [
      "/images/portfolio-6.jpg",
      "/images/hero-interior.jpg",
      "/images/portfolio-4.jpg",
      "/images/portfolio-5.jpg",
    ],
    materials: [
      "Nero Marquina Marble",
      "Brushed Titanized Steel",
      "Custom Curved Venetian Plaster",
      "Italian Mohair Velvet",
      "Smoked Mirror Glass",
    ],
    colorPalette: [
      { name: "Nero Black", hex: "#121212" },
      { name: "Titan Steel", hex: "#4A4E69" },
      { name: "Terracotta Glow", hex: "#C86D51" },
      { name: "Soft Linen", hex: "#F4F1EA" },
    ],
    furniture: [
      "Curved Custom Italian Modular Sofa",
      "Sculptural Bronze & Marble Coffee Table",
      "Double-Height Floating Fireplace Hearth",
      "Custom Cantilevered Spiral Staircase",
      "Grand Piano & Music Salon Lounge",
    ],
    highlights: [
      "22-Foot Double Height Ceiling Floor-to-Ceiling Windows",
      "Full Lutron Home Automation Integration",
      "Motorized Sky Curtain System",
      "Custom 360-Degree Panoramic View Balcony Access",
    ],
  },
  {
    id: "proj-7",
    slug: "cozy-bedroom",
    title: "Japandi Serenity Bedroom",
    roomType: "Bedroom",
    style: "Japandi Minimalist",
    budgetRange: "$20,000 - $30,000",
    estimatedCostNum: 25000,
    area: "450 sq ft",
    areaSqFt: 450,
    designer: "Aria Takahashi",
    duration: "4 weeks",
    location: "Seattle, WA",
    coverImage: "/images/hero-interior.jpg",
    galleryImages: [
      "/images/hero-interior.jpg",
      "/images/portfolio-1.jpg",
      "/images/portfolio-5.jpg",
      "/images/portfolio-4.jpg",
    ],
    materials: [
      "Natural Light Oak",
      "Woven Rattan",
      "100% Organic Linen",
      "Lime Wash Wall Coating",
      "Brushed Nickel",
    ],
    colorPalette: [
      { name: "Warm Linen", hex: "#F3EFE0" },
      { name: "Soft Chestnut", hex: "#9E7B66" },
      { name: "Muted Eucalyptus", hex: "#A3B18A" },
      { name: "Deep Charcoal", hex: "#2B2D42" },
    ],
    furniture: [
      "Platform Oak Bedframe with Fluted Headboard",
      "Floating Bedside Nightstands",
      "Handmade Rattan Reading Accent Armchair",
      "Custom Wall-to-Wall Wardrobe System",
      "Minimalist Vanity Console",
    ],
    highlights: [
      "Circadian Rhythm Smart Lighting System",
      "Soundproof Acoustic Felt Wallpaper",
      "Hidden Concealed Storage Drawers under Bed",
      "Automated Blackout Linen Drapes",
    ],
  },
  {
    id: "proj-8",
    slug: "modern-workspace",
    title: "Creative Collaborative Studio",
    roomType: "Office",
    style: "Scandinavian Collaborative",
    budgetRange: "$60,000 - $90,000",
    estimatedCostNum: 75000,
    area: "2,800 sq ft",
    areaSqFt: 2800,
    designer: "Sophia Chen",
    duration: "12 weeks",
    location: "Austin, TX",
    coverImage: "/images/about-hero.jpg",
    galleryImages: [
      "/images/about-hero.jpg",
      "/images/portfolio-3.jpg",
      "/images/hero-interior.jpg",
      "/images/portfolio-6.jpg",
    ],
    materials: [
      "Birch Plywood",
      "Recycled Felt Panels",
      "Powder-Coated White Steel",
      "Linoleum Desk Surfaces",
      "Clear Polycarbonate",
    ],
    colorPalette: [
      { name: "Birch Natural", hex: "#D8C3A5" },
      { name: "Nordic Teal", hex: "#2A9D8F" },
      { name: "Vibrant Coral", hex: "#E76F51" },
      { name: "Pure Arctic White", hex: "#FAFAFA" },
    ],
    furniture: [
      "Modular Bench Workstations",
      "Acoustic Phone Booths",
      "Mobile Dry-Erase Idea Boards",
      "Ergonomic Task Chairs",
      "Café Lounge Community Island",
    ],
    highlights: [
      "Flexible Dynamic Zoning Layout",
      "Zero-VOC Eco-Friendly Certified Materials",
      "High-Density Acoustic Ceiling Baffles",
      "Integrated Power & Cable Management Grid",
    ],
  },
]

export const PRESET_COMPARISONS: PresetComparison[] = [
  {
    id: "preset-1",
    title: "Living Room Showdown",
    projectASlug: "modern-living-room",
    projectBSlug: "penthouse-living",
    description: "Urban compact sophistication vs grand high-ceiling penthouse luxury.",
    tag: "Most Popular",
  },
  {
    id: "preset-2",
    title: "Workspace Battle",
    projectASlug: "executive-office",
    projectBSlug: "modern-workspace",
    description: "Executive private suite vs Scandinavian open collaborative studio.",
    tag: "Office Focus",
  },
  {
    id: "preset-3",
    title: "Sanctuary Retreats",
    projectASlug: "spa-bathroom",
    projectBSlug: "cozy-bedroom",
    description: "Wellness spa bathroom vs cozy Japandi bedroom sanctuary.",
    tag: "Relaxation",
  },
  {
    id: "preset-4",
    title: "Culinary & Dining",
    projectASlug: "luxury-kitchen",
    projectBSlug: "elegant-dining",
    description: "Chef's gourmet kitchen vs neo-classical formal dining parlor.",
    tag: "Entertainment",
  },
]

export function getAllCompareProjects(): CompareProject[] {
  return COMPARE_PROJECTS
}

export function getCompareProjectBySlug(slug: string): CompareProject | undefined {
  return COMPARE_PROJECTS.find((p) => p.slug === slug)
}

export function getCompareProjectById(id: string): CompareProject | undefined {
  return COMPARE_PROJECTS.find((p) => p.id === id)
}

export interface ComparisonDiff {
  matchingMaterials: string[]
  uniqueMaterialsA: string[]
  uniqueMaterialsB: string[]
  matchingFurniture: string[]
  costPerSqFtA: number
  costPerSqFtB: number
  betterValueProject: "A" | "B" | "equal"
  areaDifference: number
  areaDiffPercentage: number
  budgetDifference: number
  sameRoomType: boolean
  sameStyle: boolean
}

export function getComparisonDiff(
  projectA: CompareProject,
  projectB: CompareProject
): ComparisonDiff {
  const materialsSetA = new Set(projectA.materials.map((m) => m.toLowerCase()))
  const materialsSetB = new Set(projectB.materials.map((m) => m.toLowerCase()))

  const matchingMaterials = projectA.materials.filter((m) =>
    materialsSetB.has(m.toLowerCase())
  )

  const uniqueMaterialsA = projectA.materials.filter(
    (m) => !materialsSetB.has(m.toLowerCase())
  )
  const uniqueMaterialsB = projectB.materials.filter(
    (m) => !materialsSetA.has(m.toLowerCase())
  )

  const furnitureSetB = new Set(projectB.furniture.map((f) => f.toLowerCase()))
  const matchingFurniture = projectA.furniture.filter((f) =>
    furnitureSetB.has(f.toLowerCase())
  )

  const costPerSqFtA = Math.round(projectA.estimatedCostNum / projectA.areaSqFt)
  const costPerSqFtB = Math.round(projectB.estimatedCostNum / projectB.areaSqFt)

  let betterValueProject: "A" | "B" | "equal" = "equal"
  if (costPerSqFtA < costPerSqFtB) {
    betterValueProject = "A"
  } else if (costPerSqFtB < costPerSqFtA) {
    betterValueProject = "B"
  }

  const areaDifference = Math.abs(projectA.areaSqFt - projectB.areaSqFt)
  const maxArea = Math.max(projectA.areaSqFt, projectB.areaSqFt)
  const areaDiffPercentage = maxArea > 0 ? Math.round((areaDifference / maxArea) * 100) : 0

  const budgetDifference = Math.abs(projectA.estimatedCostNum - projectB.estimatedCostNum)

  return {
    matchingMaterials,
    uniqueMaterialsA,
    uniqueMaterialsB,
    matchingFurniture,
    costPerSqFtA,
    costPerSqFtB,
    betterValueProject,
    areaDifference,
    areaDiffPercentage,
    budgetDifference,
    sameRoomType: projectA.roomType.toLowerCase() === projectB.roomType.toLowerCase(),
    sameStyle: projectA.style.toLowerCase() === projectB.style.toLowerCase(),
  }
}
