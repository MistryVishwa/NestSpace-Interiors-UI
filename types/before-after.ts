export type RoomType =
  | "Living Room"
  | "Kitchen"
  | "Executive Office"
  | "Spa Bathroom"
  | "Dining Room"
  | "Master Bedroom"

export type InteriorStyle =
  | "Modern Minimalist"
  | "Luxury Contemporary"
  | "Industrial Chic"
  | "Spa Sanctuary"
  | "Scandinavian"
  | "Classic Elegance"

export interface ComparisonProject {
  id: string
  slug: string
  title: string
  roomType: RoomType
  style: InteriorStyle
  beforeImage: string
  afterImage: string
  description: string
  designerNotes: string
  location?: string
  duration?: string
  budgetRange?: string
  tags?: string[]
  featured?: boolean
  stats?: {
    spaceSaved?: string
    lightIncrease?: string
    satisfactionScore?: string
  }
}

export interface ComparisonFilterState {
  roomType: string
  style: string
  searchQuery: string
  sortBy: "featured" | "title" | "newest"
}
