import dayjs from 'dayjs'
import {
  createColumnHelper,
  CellContext,
} from '@tanstack/react-table'
import DataTable from './Table'
import type { Inventory } from '../types'

type InventoryTableProps = {
  data: Inventory[],
  onDelete: (inventory: Inventory) => any
}

function InventoryTable({ data, onDelete }: InventoryTableProps) {
  const columnHelper = createColumnHelper<Inventory>()

  const columns = [
    columnHelper.accessor('item.name', {
      header: () => 'Item Name',
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor('serial', {
      header: () => 'Serial Number',
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor('createdAt', {
      header: () => 'Created Date',
      cell: info => <div>{ dayjs(info.getValue()).format('MM-DD-YYYY') }</div>,
    }),
    {
      id: 'actions',
      header: () => '',
      cell: (cellContext: CellContext<Inventory, string>) => (
        <button onClick={() => onDelete(cellContext.row.original)} >Delete</button>
      ),
    },
  ]

  return (
    <DataTable data={data} columns={columns}></DataTable>
  )
}

export default InventoryTable
