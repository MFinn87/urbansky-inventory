import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as api from '../api'
import ItemsTable from '../components/ItemsTable'
import Loading from '../components/Loading'
import type { Item } from '../types'

function ItemsPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { isPending, data } = useQuery({ queryKey: ['items'], queryFn: api.findAllItems })

  const mutation = useMutation({
    mutationFn: (id: string) => api.deleteItemById(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['items'] }),
  })

  const onDeleteItem = (item: Item) => mutation.mutate(item.id)

  const onManageInventory = (item: Item) => navigate(`/items/${item.id}/inventory`)

  return (
    <div className="page">
      <div>Items</div>
      {
        data && !isPending
          ? <ItemsTable data={data} onManageInventory={onManageInventory} onDeleteItem={onDeleteItem}></ItemsTable>
          : <Loading />
      }
    </div>
  )
}

export default ItemsPage
