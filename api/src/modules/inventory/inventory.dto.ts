import { prepareForDatabase } from '../../helpers/models'
import { NewInventory, UpdateInventory } from './inventory.types'

export const toDb = (inventory: NewInventory | UpdateInventory) => prepareForDatabase({
  id: inventory.id,
  item_id: inventory.item?.id,
  serial: inventory.serial,
})
