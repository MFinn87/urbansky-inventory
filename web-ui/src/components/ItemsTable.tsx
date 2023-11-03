import {
  createColumnHelper,
  CellContext,
} from '@tanstack/react-table'
import DataTable from './Table'
import type { Item } from '../types'

type ItemsTableProps = {
  data: Item[],
  onManageInventory: (item: Item) => any
}

function ItemsTable({ data, onManageInventory }: ItemsTableProps) {
  const columnHelper = createColumnHelper<Item>()

  const columns = [
    columnHelper.accessor('name', {
      header: () => 'Name',
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor('description', {
      cell: info => info.renderValue(),
      header: () => 'Description',
    }),
    columnHelper.accessor('quantity', {
      header: () => 'Quantity',
      cell: info => info.renderValue(),
    }),
    {
      id: 'manage',
      header: () => '',
      cell: (cellContext: CellContext<Item, string>) => (
        <button onClick={() => onManageInventory(cellContext.row.original)} >Manage Inventory</button>
      ),
    },
  ]

  return (
    <DataTable data={data} columns={columns}></DataTable>
  )
}

export default ItemsTable
