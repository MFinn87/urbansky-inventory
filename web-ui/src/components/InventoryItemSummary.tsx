import dayjs from 'dayjs'
import type { Item } from '../types'

type InventoryItemSummaryProps = {
  item: Item
}

function InventoryItemSummary({ item }: InventoryItemSummaryProps) {
  return (
    <div>
      <div>Name: { item.name }</div>
      <div>Description: { item.description }</div>
      <div>Created: { dayjs(item.createdAt).format('MM-DD-YYYY') }</div>
    </div>
  )
}

export default InventoryItemSummary
