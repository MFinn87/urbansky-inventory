import { Static } from '@sinclair/typebox'
import InventoryModel from './inventory.model'
import { createRelatedModels } from '../../helpers/models'

const [NewInventoryModel, UpdateInventoryModel] = createRelatedModels(InventoryModel)

export type Inventory = Static<typeof InventoryModel>
export type NewInventory = Static<typeof NewInventoryModel>
export type UpdateInventory = Static<typeof UpdateInventoryModel>
