import db from '../../database'
import { NewItem, UpdateItem } from './item.types'

const findAll = () => db
  .select({
    id: 'item.id',
    name: 'item.name',
    description: 'item.description',
    createdAt: 'item.created_at',
    quantity: db.count('inventory.id'),
  })
  .from('item')
  .leftOuterJoin('inventory', { 'inventory.item_id': 'item.id' })
  .groupBy(['item.id', 'item.name', 'item.description', 'item.created_at'])
  .orderBy(['item.name'])

const findManyByIds = (ids: string[]) => findAll()
  .whereIn('item.id', ids)

const updateOne = (item: UpdateItem) => db
  .update(item)
  .from('item')
  .where('id', '=', item.id)

const createMany = (items: NewItem[]) => db
  .insert(items)
  .into('item')

const deleteOneById = (id: string) => db
  .transaction(async (transaction) => {
    await transaction
      .del()
      .from('inventory')
      .where('item_id', '=', id)

    await transaction
      .del()
      .from('item')
      .where('id', '=', id)
  })

export default {
  createMany,
  deleteOneById,
  findAll,
  findManyByIds,
  updateOne,
}
