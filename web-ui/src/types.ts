export type Item = {
  id: string
  name: string
  description: string
  quantity: number
  createdAt: string
}

export type InventoryItem = {
  id: string
  name: string
  description: string
  createdAt: string
}

export type Inventory = {
  id: string
  item: InventoryItem
  serial: string
  createdAt: string
}
