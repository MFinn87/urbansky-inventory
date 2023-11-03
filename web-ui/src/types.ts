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

export type NewItem = {
  name: string
  description: string
}

export type NewInventory = {
  item: Item
  serial: string
}

export type UpdateItem = NewItem & {
  id: string
}

export type UpdateInventory = NewInventory & {
  id: string
}
