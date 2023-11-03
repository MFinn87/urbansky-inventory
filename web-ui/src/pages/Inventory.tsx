import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as api from '../api'
import InventoryTable from '../components/InventoryTable'
import Loading from '../components/Loading'
import type { Inventory } from '../types'

function InventoryPage() {
  const queryClient = useQueryClient()
  const { isPending, data } = useQuery({ queryKey: ['inventory'], queryFn: api.findAllInventory })

  const mutation = useMutation({
    mutationFn: (id: string) => api.deleteInventoryById(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inventory'] }),
  })

  const onDelete = (inventory: Inventory) => mutation.mutate(inventory.id)

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
