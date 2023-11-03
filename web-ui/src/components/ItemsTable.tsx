import dayjs from 'dayjs'
import {
  createColumnHelper,
  CellContext,
} from '@tanstack/react-table'
import { Button } from 'rsuite'
import DataTable from './Table'
import type { Item } from '../types'
import './ItemsTable.css'

type ItemsTableProps = {
  data: Item[],
  onManageInventory: (item: Item) => any,
  onUpdateItem: (item: Item) => any
  onDeleteItem: (item: Item) => any,
}

function ItemsTable({ data, onManageInventory, onUpdateItem, onDeleteItem }: ItemsTableProps) {
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
          <Button appearance="primary" onClick={() => onManageInventory(cellContext.row.original)} >Manage Inventory</Button>
          <Button appearance="primary" onClick={() => onUpdateItem(cellContext.row.original)} >Update</Button>
          <Button appearance="ghost" color="red" onClick={() => onDeleteItem(cellContext.row.original)} >Delete</Button>
        </div>
      ),
    },
  ]

  return (
    <DataTable data={data} columns={columns}></DataTable>
  )
}

export default ItemsTable
