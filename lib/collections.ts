export interface CollectionProject {
  id: string
  title: string
  roomType: string
  style: string
  image: string
  description?: string
  portfolioSlug?: string
}

export interface Collection {
  id: string
  slug: string
  title: string
  description: string
  coverImage: string
  category: string
  style: string
  projectCount: number
  featured: boolean
  tags: string[]
  projects: CollectionProject[]
}

export interface CollectionStatsData {
  totalCollections: number
  totalProjects: number
  styleCount: number
  categoryCount: number
}

export const collections: Collection[] = [
  {
    id: "col-1",
    slug: "modern-living-room",
    title: "Modern Living Rooms",
    description:
      "Clean architectural lines, open floor concepts, warm neutral palettes, and refined bespoke furnishings curated for living spaces.",
    coverImage: "/images/portfolio-1.jpg",
    category: "Living Room",
    style: "Modern",
    projectCount: 4,
    featured: true,
    tags: ["Modern", "Living Room", "Open Plan", "Neutral Tones", "Bespoke"],
    projects: [
      {
        id: "proj-101",
        title: "Manhattan Open Concept Living",
        roomType: "Living Room",
        style: "Modern",
        image: "/images/portfolio-1.jpg",
        description:
          "Contemporary lounge featuring custom built-in shelving, warm accents, and flood of natural light.",
        portfolioSlug: "modern-living-room",
      },
      {
        id: "proj-102",
        title: "SoHo Minimalist Loft",
        roomType: "Living Room",
        style: "Modern",
        image: "/images/hero-interior.jpg",
        description:
          "Sleek architectural details paired with soft velvet upholstery and ambient cove lighting.",
        portfolioSlug: "cozy-bedroom",
      },
      {
        id: "proj-103",
        title: "Tribeca Sunlit Lounge",
        roomType: "Living Room",
        style: "Modern",
        image: "/images/portfolio-5.jpg",
        description:
          "Sophisticated entertaining area centered around custom marble fireplace surround.",
        portfolioSlug: "elegant-dining",
      },
      {
        id: "proj-104",
        title: "High-Rise Sky Sanctuary",
        roomType: "Living Room",
        style: "Modern",
        image: "/images/portfolio-6.jpg",
        description:
          "Panoramic cityscape views complemented by minimalist modular seating arrangement.",
        portfolioSlug: "penthouse-living",
      },
    ],
  },
  {
    id: "col-2",
    slug: "luxury-bedrooms",
    title: "Luxury Bedrooms",
    description:
      "Opuluxe bedroom sanctuaries incorporating plush textures, ambient layered lighting, custom headboards, and serene palettes.",
    coverImage: "/images/hero-interior.jpg",
    category: "Bedroom",
    style: "Luxury",
    projectCount: 4,
    featured: true,
    tags: ["Bedroom", "Luxury", "Serene", "Custom Headboards", "Hotel Vibe"],
    projects: [
      {
        id: "proj-201",
        title: "Bel Air Primary Suite",
        roomType: "Bedroom",
        style: "Luxury",
        image: "/images/hero-interior.jpg",
        description:
          "Sumptuous retreat featuring upholstered wall panels and motorized blackout drapery.",
        portfolioSlug: "cozy-bedroom",
      },
      {
        id: "proj-202",
        title: "Upper East Side Haven",
        roomType: "Bedroom",
        style: "Luxury",
        image: "/images/portfolio-4.jpg",
        description:
          "Refined suite infused with champagne metallic accents and custom silk wall coverings.",
        portfolioSlug: "spa-bathroom",
      },
      {
        id: "proj-203",
        title: "Aspen Alpine Suite",
        roomType: "Bedroom",
        style: "Luxury",
        image: "/images/portfolio-1.jpg",
        description:
          "Cozy mountain modern suite with integrated fireplace and cashmere upholstery.",
        portfolioSlug: "modern-living-room",
      },
      {
        id: "proj-204",
        title: "Waterfront Serenity Suite",
        roomType: "Bedroom",
        style: "Luxury",
        image: "/images/about-hero.jpg",
        description:
          "Peaceful master suite framed by floor-to-ceiling glass and soft wool rugs.",
        portfolioSlug: "modern-workspace",
      },
    ],
  },
  {
    id: "col-3",
    slug: "scandinavian-kitchens",
    title: "Scandinavian Kitchens",
    description:
      "Functional minimalism blending natural timber warmth, crisp white surfaces, handleless cabinetry, and effortless organization.",
    coverImage: "/images/portfolio-2.jpg",
    category: "Kitchen",
    style: "Scandinavian",
    projectCount: 4,
    featured: true,
    tags: ["Kitchen", "Scandinavian", "Wood Tones", "Minimalism", "Smart Storage"],
    projects: [
      {
        id: "proj-301",
        title: "Beverly Hills Gourmet Culinary",
        roomType: "Kitchen",
        style: "Scandinavian",
        image: "/images/portfolio-2.jpg",
        description:
          "Light oak timber cabinetry paired with waterfall quartz counter island and brass fixtures.",
        portfolioSlug: "luxury-kitchen",
      },
      {
        id: "proj-302",
        title: "Nordic Minimalist Kitchen",
        roomType: "Kitchen",
        style: "Scandinavian",
        image: "/images/portfolio-5.jpg",
        description:
          "Matte white handleless fronts contrasted with warm ash wood open shelving.",
        portfolioSlug: "elegant-dining",
      },
      {
        id: "proj-303",
        title: "Organic Modern Pantry & Kitchen",
        roomType: "Kitchen",
        style: "Scandinavian",
        image: "/images/portfolio-3.jpg",
        description:
          "Ergonomic kitchen layout featuring hidden appliance garages and fluted wood details.",
        portfolioSlug: "executive-office",
      },
      {
        id: "proj-304",
        title: "Urban Chef Sanctuary",
        roomType: "Kitchen",
        style: "Scandinavian",
        image: "/images/portfolio-4.jpg",
        description:
          "Sleek stainless and oak fusion kitchen engineered for seamless social cooking.",
        portfolioSlug: "spa-bathroom",
      },
    ],
  },
  {
    id: "col-4",
    slug: "compact-apartments",
    title: "Compact Apartments",
    description:
      "Intelligent spatial planning, multi-functional custom millwork, sliding partitions, and light-maximizing design strategies for urban living.",
    coverImage: "/images/portfolio-6.jpg",
    category: "Apartment",
    style: "Minimal",
    projectCount: 3,
    featured: false,
    tags: ["Apartment", "Compact", "Minimal", "Space Saving", "Custom Millwork"],
    projects: [
      {
        id: "proj-401",
        title: "Chelsea Micro Studio Transformation",
        roomType: "Apartment",
        style: "Minimal",
        image: "/images/portfolio-6.jpg",
        description:
          "Transformative layout utilizing hidden wall beds and modular floating credenzas.",
        portfolioSlug: "penthouse-living",
      },
      {
        id: "proj-402",
        title: "Tokyo-Inspired Urban Apartment",
        roomType: "Apartment",
        style: "Minimal",
        image: "/images/portfolio-1.jpg",
        description:
          "Sliding Shoji-style glass partitions separating workspace from sleeping quarters.",
        portfolioSlug: "modern-living-room",
      },
      {
        id: "proj-403",
        title: "West Village Efficiency Suite",
        roomType: "Apartment",
        style: "Minimal",
        image: "/images/about-hero.jpg",
        description:
          "Clever vertical storage integration paired with reflective acoustic panelling.",
        portfolioSlug: "modern-workspace",
      },
    ],
  },
  {
    id: "col-5",
    slug: "office-interiors",
    title: "Office Interiors",
    description:
      "Inspiring workspace designs engineered for productivity, executive presence, acoustic privacy, and ergonomic comfort.",
    coverImage: "/images/portfolio-3.jpg",
    category: "Office",
    style: "Industrial",
    projectCount: 3,
    featured: false,
    tags: ["Office", "Industrial", "Ergonomic", "Executive", "Acoustics"],
    projects: [
      {
        id: "proj-501",
        title: "Chicago Executive Suite",
        roomType: "Office",
        style: "Industrial",
        image: "/images/portfolio-3.jpg",
        description:
          "Motorized acoustic glass partition transforming executive study into board conference space.",
        portfolioSlug: "executive-office",
      },
      {
        id: "proj-502",
        title: "Austin Creative Studio",
        roomType: "Office",
        style: "Industrial",
        image: "/images/about-hero.jpg",
        description:
          "Exposed brick, steel frame glass walls, and ergonomic sit-stand executive desks.",
        portfolioSlug: "modern-workspace",
      },
      {
        id: "proj-503",
        title: "Silicon Valley Innovation Lounge",
        roomType: "Office",
        style: "Industrial",
        image: "/images/portfolio-2.jpg",
        description:
          "Private pod acoustic phone booths and central collaborative timber meeting table.",
        portfolioSlug: "luxury-kitchen",
      },
    ],
  },
  {
    id: "col-6",
    slug: "minimalist-dining",
    title: "Minimalist Dining Spaces",
    description:
      "Striking dining rooms defined by sculptural statement lighting, tailored seating, natural stone tables, and uncluttered elegance.",
    coverImage: "/images/portfolio-5.jpg",
    category: "Dining Room",
    style: "Minimal",
    projectCount: 3,
    featured: false,
    tags: ["Dining Room", "Minimal", "Sculptural Lighting", "Stone Tables", "Entertaining"],
    projects: [
      {
        id: "proj-601",
        title: "San Francisco Pacific Heights Dining",
        roomType: "Dining Room",
        style: "Minimal",
        image: "/images/portfolio-5.jpg",
        description:
          "Extendable smoked oak table with brass accents under suspended designer chandelier.",
        portfolioSlug: "elegant-dining",
      },
      {
        id: "proj-602",
        title: "Tribeca Marble Dining Alcove",
        roomType: "Dining Room",
        style: "Minimal",
        image: "/images/portfolio-1.jpg",
        description:
          "Honed Calacatta marble oval dining table surrounded by tactile leather dining chairs.",
        portfolioSlug: "modern-living-room",
      },
      {
        id: "proj-603",
        title: "Malibu Coastal Glass Dining Space",
        roomType: "Dining Room",
        style: "Minimal",
        image: "/images/portfolio-6.jpg",
        description:
          "Frameless glass dining room framing sunset ocean views with minimalist aesthetic.",
        portfolioSlug: "penthouse-living",
      },
    ],
  },
]

export function getCollections(): Collection[] {
  return collections
}

export function getFeaturedCollections(): Collection[] {
  return collections.filter((c) => c.featured)
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug)
}

export function getCollectionCategories(): string[] {
  const categories = collections.map((c) => c.category)
  return Array.from(new Set(categories))
}

export function getCollectionStyles(): string[] {
  const styles = collections.map((c) => c.style)
  return Array.from(new Set(styles))
}

export function getCollectionStats(): CollectionStatsData {
  const totalCollections = collections.length
  const totalProjects = collections.reduce((acc, c) => acc + c.projectCount, 0)
  const styleCount = getCollectionStyles().length
  const categoryCount = getCollectionCategories().length

  return {
    totalCollections,
    totalProjects,
    styleCount,
    categoryCount,
  }
}
