export type FurnitureCategory =
  | "living-room"
  | "bedroom"
  | "kitchen"
  | "office"
  | "decor"

export type RoomType =
  | "living-room"
  | "bedroom"
  | "kitchen"
  | "office"
  | "apartment"

export interface FurnitureTemplate {
  id: string
  name: string
  category: FurnitureCategory
  width: number
  height: number
  iconName: string
  defaultRotation: 0 | 90 | 180 | 270
  color: string
  description?: string
  minWidth: number
  maxWidth: number
  minHeight: number
  maxHeight: number
}

export interface PlacedFurniture {
  instanceId: string
  templateId: string
  name: string
  category: FurnitureCategory
  x: number
  y: number
  width: number
  height: number
  rotation: 0 | 90 | 180 | 270
  color: string
  iconName: string
  zIndex: number
}

export interface RoomPreset {
  type: RoomType
  label: string
  width: number
  height: number
  gridSize: number
  description: string
  defaultItems: Omit<PlacedFurniture, "instanceId" | "zIndex">[]
}
