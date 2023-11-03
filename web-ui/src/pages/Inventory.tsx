import { useQuery } from '@tanstack/react-query'
import * as api from '../api'
import InventoryTable from '../components/InventoryTable'
import Loading from '../components/Loading'
import type { Inventory } from '../types'

function InventoryPage() {
  const { isPending, data } = useQuery({ queryKey: ['inventory'], queryFn: api.findAllInventory() })

  const onDelete = (inventory: Inventory) => console.log('DEBUG CLICKED: ', inventory)

  return (
    <div className="page">
      <div>Inventory</div>
      {
        data && !isPending
          ? <InventoryTable data={data} onDelete={onDelete}></InventoryTable>
          : <Loading />
      }
    </div>
  )
}

export default InventoryPage
