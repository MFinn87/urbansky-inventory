import dayjs from 'dayjs'
import {
  createColumnHelper,
  CellContext,
} from '@tanstack/react-table'
import DataTable from './Table'
import type { Item } from '../types'
import './ItemsTable.css'

type ItemsTableProps = {
  data: Item[],
  onManageInventory: (item: Item) => any,
  onDeleteItem: (item: Item) => any
}

function ItemsTable({ data, onManageInventory, onDeleteItem }: ItemsTableProps) {
  const columnHelper = createColumnHelper<Item>()

  const columns = [
    columnHelper.accessor('name', {
      header: () => 'Name',
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor('description', {
      header: () => 'Description',
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor('quantity', {
      header: () => 'Quantity',
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor('createdAt', {
      header: () => 'Created Date',
      cell: info => <div>{ dayjs(info.getValue()).format('MM-DD-YYYY') }</div>,
    }),
    {
      id: 'actions',
      header: () => '',
      cell: (cellContext: CellContext<Item, string>) => (
        <div className="items-table-actions-container">
          <button onClick={() => onManageInventory(cellContext.row.original)} >Manage Inventory</button>
          <button onClick={() => onDeleteItem(cellContext.row.original)} >Delete</button>
        </div>
      ),
    },
  ]

  return (
    <DataTable data={data} columns={columns}></DataTable>
  )
}

export default ItemsTable
