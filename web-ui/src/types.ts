export type Item = {
  id: string
  name: string
  description: string
  quantity: number
}

export type Inventory = {
  id: string
  item: {
    id: string
    name: string
    description: string
  }
  serial: string
}
