import { first, map } from 'lodash'
import { deleteSuccess } from '../../helpers/models'
import queries from './inventory.queries'
import type { Inventory, NewInventory, UpdateInventory } from './inventory.types'

const createMany = async (inventory: NewInventory[]): Promise<Inventory[]> => {
  const ids = map(inventory, (inventoryRecord) => inventoryRecord.id)

  await queries.createMany(inventory)
  const createdInventory = await queries.findManyByIds(ids)

  return createdInventory
}

const findMany = async (): Promise<Inventory[]> => {
  const inventory = await queries.findAll()

  return inventory
}

const findOneById = async (id: string): Promise<Inventory | null> => {
  const inventory = await queries.findManyByIds([id])

  return first(inventory) || null
}

const findManyByItemId = async (itemId: string): Promise<Inventory[]> => {
  const inventory = await queries.findManyByItemId(itemId)

  return inventory
}

const updateOne = async (inventory: UpdateInventory): Promise<Inventory | null> => {
  await queries.updateOne(inventory)
  const updatedInventory = await findOneById(inventory.id)

  return updatedInventory
}

const deleteOneById = async (id: string) => {
  await queries.deleteOneById(id)

  return deleteSuccess
}

export default {
  createMany,
  deleteOneById,
  findMany,
  findOneById,
  findManyByItemId,
  updateOne,
}
