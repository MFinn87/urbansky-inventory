import type { Item, Inventory } from '../types'

export const findAllItems = async () => {
  const response = await fetch('http://127.0.0.1:8080/items', { method: 'GET' })
  const items = await response.json()

  return items as Item[]
}

export const findAllInventory = async () => {
  const response = await fetch('http://127.0.0.1:8080/inventory', { method: 'GET' })
  const inventory = await response.json()

  return inventory as Inventory[]
}

export const findAllInventoryByItemId = (itemId: string | null) => async () => {
  const itemIdQueryParameter = itemId
    ? `?itemId=${itemId}`
    : ''
  const response = await fetch(`http://127.0.0.1:8080/inventory${itemIdQueryParameter}`, { method: 'GET' })
  const inventory = await response.json()

  return inventory as Inventory[]
}

export const deleteItemById = async (id: string) => {
  const response = await fetch(`http://127.0.0.1:8080/items/${id}`, { method: 'DELETE' })
  const result = await response.json()

  console.log(result)
}

export const deleteInventoryById = async (id: string) => {
  const response = await fetch(`http://127.0.0.1:8080/inventory/${id}`, { method: 'DELETE' })
  const result = await response.json()

  console.log(result)
}
