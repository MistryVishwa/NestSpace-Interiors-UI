export type ItemType =
  | "image"
  | "color"
  | "material"
  | "texture"
  | "furniture"
  | "note"

export interface ColorPalette {
  id: string
  name: string
  hex: string
  secondaryHexes?: string[]
  finish?: "matte" | "gloss" | "satin" | "brushed" | "natural" | "metallic"
  category: string
  tags: string[]
}

export interface Texture {
  id: string
  name: string
  category: string
  tactileDescription: string
  imageUrl: string
  patternType: string
  suggestedUse: string
}

export interface Material {
  id: string
  name: string
  category: "wood" | "stone" | "metal" | "fabric" | "glass" | "ceramic" | "leather"
  finish: string
  imageUrl: string
  origin?: string
  sustainabilityRating?: string
}

export interface FurnitureReference {
  id: string
  name: string
  category: string
  dimensions: string
  estimatedPrice: string
  vendor: string
  imageUrl: string
  style: string
}

export interface ImageAsset {
  id: string
  title: string
  category: string
  imageUrl: string
  aspectRatio: "square" | "landscape" | "portrait"
  tags: string[]
}

export interface NoteContent {
  text: string
  backgroundColor?: string
  textColor?: string
  fontSize?: "sm" | "base" | "lg" | "xl"
}

export interface BoardItem {
  id: string
  type: ItemType
  x: number
  y: number
  width: number
  height: number
  zIndex: number
  rotation?: number
  title: string
  content?: string
  
  // Type-specific properties
  colorData?: ColorPalette
  textureData?: Texture
  materialData?: Material
  furnitureData?: FurnitureReference
  imageData?: ImageAsset
  noteData?: NoteContent

  // Styling options
  frameStyle?: "none" | "polaroid" | "rounded" | "shadow" | "bordered"
  aspectRatioLock?: boolean
}

export interface Board {
  id: string
  title: string
  description: string
  category: string
  updatedAt: string
  backgroundColor: string
  showGrid: boolean
  items: BoardItem[]
}

export interface PresetBoard {
  id: string
  title: string
  description: string
  category: string
  coverImage: string
  items: Omit<BoardItem, "id">[]
}

export type AssetCategory = "all" | "colors" | "textures" | "materials" | "furniture" | "images" | "notes"
