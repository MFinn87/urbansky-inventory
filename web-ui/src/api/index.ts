import type { Item, Inventory } from '../types'

const sleep = (delayMs: number) => new Promise((resolve) => setTimeout(resolve, delayMs))

export const findAllItems = async () => {
  const response = await fetch('http://127.0.0.1:8080/items', { method: 'GET' })
  const items = await response.json()
  await sleep(250)

  return items as Item[]
}

export const findAllInventory = (itemId?: string | null) => async () => {
  const itemIdQueryParameter = itemId
    ? `?itemId=${itemId}`
    : ''

  const response = await fetch(`http://127.0.0.1:8080/inventory${itemIdQueryParameter}`, { method: 'GET' })
  const inventory = await response.json()
  await sleep(250)

  return inventory as Inventory[]
}
