import { Type } from '@sinclair/typebox'
import { createModel, UUID } from '../../lib/models'
import ItemModel from '../item/item.model'

const InventoryModel = createModel('inventory', Type.Object({
  id: UUID({
    description: 'Uniquely identifies an Inventory record.',
  }),
  item: ItemModel,
  serial: Type.String({
    description: 'The serial number that uniquely identifies an instance of the item. An item cannot have duplicate inventory records with the same serial number.',
    maxLength: 63,
  }),
  createdAt: Type.String({
    description: 'The datetime the inventory was created.',
  }),
}))

export default InventoryModel
