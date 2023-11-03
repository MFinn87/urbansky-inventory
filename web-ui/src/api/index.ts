import type { Item, Inventory, NewItem, NewInventory, UpdateItem } from '../types'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

export const createItem = async (item: NewItem) => {
  const response = await fetch(
    `${apiBaseUrl}/items`,
    {
      method: 'POST',
      body: JSON.stringify([item]),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  const createdItems = await response.json()

  return createdItems[0] as Item
}

export const createInventory = async (inventory: NewInventory) => {
  const response = await fetch(
    `${apiBaseUrl}/inventory`,
    {
      method: 'POST',
      body: JSON.stringify([inventory]),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  const createdInventory = await response.json()

  return createdInventory[0] as Inventory
}

export const findAllItems = async () => {
  const response = await fetch(`${apiBaseUrl}/items`, { method: 'GET' })
  const items = await response.json()

  return items as Item[]
}

export const findItemById = (id: string) => async () => {
  const response = await fetch(`${apiBaseUrl}/items/${id}`, { method: 'GET' })
  const item = await response.json()

  return item as Item
}

export const findAllInventory = async () => {
  const response = await fetch(`${apiBaseUrl}/inventory`, { method: 'GET' })
  const inventory = await response.json()

  return inventory as Inventory[]
}

export const findAllInventoryByItemId = (itemId: string | null) => async () => {
  const itemIdQueryParameter = itemId
    ? `?itemId=${itemId}`
    : ''
  const response = await fetch(`${apiBaseUrl}/inventory${itemIdQueryParameter}`, { method: 'GET' })
  const inventory = await response.json()

  return inventory as Inventory[]
}

export const updateItem = async (item: UpdateItem) => {
  const response = await fetch(
    `${apiBaseUrl}/items/${item.id}`,
    {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  const updatedItem = await response.json()

  return updatedItem as Item
}

export const deleteItemById = async (id: string) => {
  const response = await fetch(`${apiBaseUrl}/items/${id}`, { method: 'DELETE' })
  const result = await response.json()

  console.log(result)
}

export const deleteInventoryById = async (id: string) => {
  const response = await fetch(`${apiBaseUrl}/inventory/${id}`, { method: 'DELETE' })
  const result = await response.json()

  console.log(result)
}
