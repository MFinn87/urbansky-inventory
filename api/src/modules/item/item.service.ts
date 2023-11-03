import { first, map } from 'lodash'
import { deleteSuccess } from '../../helpers/models'
import queries from './item.queries'
import type { Item, NewItem, UpdateItem } from './item.types'

const createMany = async (items: NewItem[]): Promise<Item[]> => {
  const ids = map(items, (item) => item.id)

  await queries.createMany(items)
  const createdItems = await queries.findManyByIds(ids)

  return createdItems
}

const findMany = async (): Promise<Item[]> => {
  const items = await queries.findAll()

  return items
}

const findOneById = async (id: string): Promise<Item | null> => {
  const items = await queries.findManyByIds([id])

  return first(items) || null
}

const updateOne = async (item: UpdateItem): Promise<Item | null> => {
  await queries.updateOne(item)
  const updatedItem = await findOneById(item.id)

  return updatedItem
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
  updateOne,
}
