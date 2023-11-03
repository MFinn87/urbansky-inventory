import { Type } from '@sinclair/typebox'
import { createModel, UUID } from '../../helpers/models'

const InventoryItemModel = createModel('inventoryItem', Type.Object({
  id: UUID({ description: 'Uniquely identifies an Item record.' }),
  name: Type.Readonly(Type.String({
    description: 'The item name.',
    maxLength: 63,
  })),
  description: Type.Readonly(Type.String({
    description: 'The item description.',
    maxLength: 127,
  })),
  createdAt: Type.Readonly(Type.String({
    description: 'The datetime the item record was created, in UTC. This value cannot be set directly by clients - it is only set by the server.',
  })),
}))

const InventoryModel = createModel('inventory', Type.Object({
  id: UUID({
    description: 'Uniquely identifies an Inventory record.',
  }),
  item: InventoryItemModel,
  serial: Type.String({
    description: 'The serial number that uniquely identifies an instance of the item. An item cannot have duplicate inventory records with the same serial number.',
    maxLength: 63,
  }),
  createdAt: Type.Readonly(Type.String({
    description: 'The datetime the inventory record was created, in UTC. This value cannot be set directly by clients - it is only set by the server.',
  })),
}))

export default InventoryModel
