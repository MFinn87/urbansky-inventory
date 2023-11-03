import { map } from 'lodash'
import db, { helpers } from '../../database'
import { toDb } from './inventory.dto'
import { NewInventory, UpdateInventory } from './inventory.types'

const { useBuildObject } = helpers.query
const buildObject = useBuildObject(db)

const findAll = () => db
  .select({
    id: 'inventory.id',
    item: buildObject({
      id: 'item.id',
      name: 'item.name',
      description: 'item.description',
      createdAt: 'item.created_at',
    }),
    serial: 'inventory.serial',
    createdAt: 'inventory.created_at',
  })
  .from('inventory')
  .innerJoin('item', { 'item.id': 'inventory.item_id' })
  .orderBy(['inventory.created_at'])

const findManyByIds = (ids: string[]) => findAll()
  .whereIn('inventory.id', ids)

const findManyByItemId = (itemId: string) => findAll()
  .where('inventory.item_id', '=', itemId)

const updateOne = (inventory: UpdateInventory) => db
  .update(toDb(inventory))
  .from('inventory')
  .where('id', '=', inventory.id)

const createMany = (inventoryRecords: NewInventory[]) => db
  .insert(map(inventoryRecords, toDb))
  .into('inventory')

const deleteOneById = (id: string) => db
  .del()
  .from('inventory')
  .where('id', '=', id)

export default {
  createMany,
  deleteOneById,
  findAll,
  findManyByIds,
  findManyByItemId,
  updateOne,
}
