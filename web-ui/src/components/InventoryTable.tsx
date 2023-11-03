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
      cell: info => info.renderValue(),
      header: () => 'Serial Number',
    }),
    {
      id: 'delete',
      header: () => 'Delete',
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
