import { ComparisonProject, RoomType, InteriorStyle } from "@/types/before-after"

export const BEFORE_AFTER_PROJECTS: ComparisonProject[] = [
  {
    id: "proj-1",
    slug: "modern-living-transformation",
    title: "Manhattan Modern Living Transformation",
    roomType: "Living Room",
    style: "Modern Minimalist",
    beforeImage: "/images/portfolio-3.jpg",
    afterImage: "/images/portfolio-1.jpg",
    description:
      "Transformed an outdated, cluttered layout into a luminous, open-concept living area featuring custom built-in shelving, warm ambient cove lighting, and acoustic oak panelling.",
    designerNotes:
      "We removed non-load-bearing partitions to open up sightlines toward east-facing windows, amplifying natural illumination while maximizing seating capacity.",
    location: "Manhattan, NY",
    duration: "6 weeks",
    budgetRange: "$45,000 - $60,000",
    tags: ["Open Concept", "Built-ins", "Ambient Lighting", "Acoustic Wood"],
    featured: true,
    stats: {
      spaceSaved: "32%",
      lightIncrease: "+45%",
      satisfactionScore: "99%",
    },
  },
  {
    id: "proj-2",
    slug: "luxury-kitchen-renovation",
    title: "Beverly Hills Gourmet Modular Kitchen",
    roomType: "Kitchen",
    style: "Luxury Contemporary",
    beforeImage: "/images/portfolio-5.jpg",
    afterImage: "/images/portfolio-2.jpg",
    description:
      "Replaced dark enclosed cabinetry with seamless waterfall marble countertops, concealed smart storage drawers, and hand-brushed brass hardware.",
    designerNotes:
      "By integrating touch-to-open handleless cabinetry and recessed LED task strip lighting, we maximized chef-level workflow efficiency while preserving sleek visual purity.",
    location: "Beverly Hills, CA",
    duration: "8 weeks",
    budgetRange: "$75,000 - $95,000",
    tags: ["Waterfall Marble", "Modular Storage", "Brass Hardware", "Smart Kitchen"],
    featured: true,
    stats: {
      spaceSaved: "25%",
      lightIncrease: "+60%",
      satisfactionScore: "100%",
    },
  },
  {
    id: "proj-3",
    slug: "executive-suite-redesign",
    title: "Chicago Executive Office Suite",
    roomType: "Executive Office",
    style: "Industrial Chic",
    beforeImage: "/images/portfolio-1.jpg",
    afterImage: "/images/portfolio-3.jpg",
    description:
      "Converted a rigid cubicle configuration into an executive suite with motorized privacy glass partitions, walnut desk surfaces, and ergonomic acoustic ceiling bays.",
    designerNotes:
      "Integrated state-of-the-art concealed video conferencing gear and acoustic fabric walls to facilitate seamless high-stakes client meetings.",
    location: "Chicago, IL",
    duration: "10 weeks",
    budgetRange: "$90,000 - $120,000",
    tags: ["Privacy Glass", "Walnut Finish", "Acoustics", "Smart Office"],
    featured: true,
    stats: {
      spaceSaved: "40%",
      lightIncrease: "+35%",
      satisfactionScore: "98%",
    },
  },
  {
    id: "proj-4",
    slug: "spa-bathroom-sanctuary",
    title: "Miami Seaside Spa Bathroom Sanctuary",
    roomType: "Spa Bathroom",
    style: "Spa Sanctuary",
    beforeImage: "/images/portfolio-2.jpg",
    afterImage: "/images/portfolio-4.jpg",
    description:
      "Replaced a cramped traditional bath enclosure with a sprawling rain shower, freestanding soak tub, radiant heated porcelain floors, and floating double vanity.",
    designerNotes:
      "Reconfigured plumbing channels to center the soaking tub against the window, creating a true resort-at-home experience with mood dimming controls.",
    location: "Miami, FL",
    duration: "5 weeks",
    budgetRange: "$35,000 - $50,000",
    tags: ["Rain Shower", "Freestanding Tub", "Radiant Heat", "Floating Vanity"],
    featured: false,
    stats: {
      spaceSaved: "28%",
      lightIncrease: "+50%",
      satisfactionScore: "100%",
    },
  },
  {
    id: "proj-5",
    slug: "grand-dining-hall",
    title: "San Francisco Elegant Dining Space",
    roomType: "Dining Room",
    style: "Classic Elegance",
    beforeImage: "/images/hero-interior.jpg",
    afterImage: "/images/portfolio-5.jpg",
    description:
      "Elevated a plain dining area into a grand entertaining hall featuring a hand-crafted solid oak table for 10, architectural crown molding, and statement pendant lighting.",
    designerNotes:
      "Layered subtle velvet textures and matte brass accents with warm 2700K dimmable illumination to easily shift the ambiance from family dinners to formal galas.",
    location: "San Francisco, CA",
    duration: "4 weeks",
    budgetRange: "$30,000 - $42,000",
    tags: ["Oak Table", "Crown Molding", "Statement Lighting", "Velvet Accent"],
    featured: false,
    stats: {
      spaceSaved: "20%",
      lightIncrease: "+40%",
      satisfactionScore: "97%",
    },
  },
  {
    id: "proj-6",
    slug: "skyline-penthouse-suite",
    title: "New York Skyline Penthouse Suite",
    roomType: "Master Bedroom",
    style: "Scandinavian",
    beforeImage: "/images/about-hero.jpg",
    afterImage: "/images/portfolio-6.jpg",
    description:
      "Transformed an uninspired master bedroom into a high-elevation luxury retreat with double-height floor-to-ceiling windows, floating headboard wall, and custom walk-in dressing lounge.",
    designerNotes:
      "Utilized muted neutral textiles, tactile bouclé upholstery, and concealed blackout drapery to maintain a calm, serene atmosphere amidst urban energy.",
    location: "New York, NY",
    duration: "12 weeks",
    budgetRange: "$110,000 - $140,000",
    tags: ["Penthouse", "Bouclé Fabric", "Floating Headboard", "Dressing Lounge"],
    featured: false,
    stats: {
      spaceSaved: "35%",
      lightIncrease: "+55%",
      satisfactionScore: "100%",
    },
  },
]

export const ROOM_TYPES: RoomType[] = [
  "Living Room",
  "Kitchen",
  "Executive Office",
  "Spa Bathroom",
  "Dining Room",
  "Master Bedroom",
]

export const INTERIOR_STYLES: InteriorStyle[] = [
  "Modern Minimalist",
  "Luxury Contemporary",
  "Industrial Chic",
  "Spa Sanctuary",
  "Scandinavian",
  "Classic Elegance",
]

export function getAllComparisons(): ComparisonProject[] {
  return BEFORE_AFTER_PROJECTS
}

export function getComparisonBySlug(slug: string): ComparisonProject | undefined {
  return BEFORE_AFTER_PROJECTS.find((p) => p.slug === slug)
}

export function getFeaturedComparisons(): ComparisonProject[] {
  return BEFORE_AFTER_PROJECTS.filter((p) => p.featured)
}
