import dayjs from 'dayjs'
import type { InventoryItem } from '../types'

type InventoryItemComponentProps = {
  inventoryItem: InventoryItem
}

function InventoryItemComponent({ inventoryItem }: InventoryItemComponentProps) {
  return (
    <div>
      <div>{ inventoryItem.name }</div>
      <div>{ inventoryItem.description }</div>
      <div>{ dayjs(inventoryItem.createdAt).format('MM-DD-YYYY') }</div>
    </div>
  )
}

export default InventoryItemComponent
