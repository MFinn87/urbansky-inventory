import { Type } from '@sinclair/typebox'
import { createModel, UUID } from '../../helpers/models'

// You can think of this as like a SKU, or any inventoryable item.
// MAYBE TODO: Set title and description separately in the createModel?
const ItemModel = createModel('item', Type.Object({
  id: UUID({ description: 'Uniquely identifies an Item record.' }),
  name: Type.String({
    description: 'The item name.',
    maxLength: 63,
  }),
  description: Type.String({
    description: 'The item description.',
    maxLength: 127,
  }),
  quantity: Type.Readonly(Type.Number({
    description: 'The total quantity of inventory for this item. This value cannot be set directly, it is just a calculated aggregation over inventory records.',
  })),
  createdAt: Type.Readonly(Type.String({
    description: 'The datetime the item record was created, in UTC. This value cannot be set directly by clients - it is only set by the server.',
  })),
}))

export default ItemModel
