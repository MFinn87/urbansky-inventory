import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as api from '../api'
import InventoryTable from '../components/InventoryTable'
import InventoryItem from '../components/InventoryItem'
import Loading from '../components/Loading'
import type { Inventory } from '../types'

function InventoryByItemIdPage() {
  const { itemId } = useParams()
  const queryClient = useQueryClient()
  const { isPending, data } = useQuery({ queryKey: ['inventory', itemId], queryFn: api.findAllInventoryByItemId(itemId || null) })

  const mutation = useMutation({
    mutationFn: (id: string) => api.deleteInventoryById(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inventory', itemId] }),
  })

  const onDelete = (inventory: Inventory) => mutation.mutate(inventory.id)

  return (
    <div className="page">
      {
        data && !isPending
          ? <div>
              <InventoryItem inventoryItem={data[0].item} />
              <div>Inventory</div>
              <InventoryTable data={data} onDelete={onDelete}></InventoryTable>
            </div>
          : <Loading />
      }
    </div>
  )
}

export default InventoryByItemIdPage
