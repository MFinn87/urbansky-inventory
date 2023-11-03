import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'rsuite'
import * as api from '../api'
import ItemsTable from '../components/ItemsTable'
import Loading from '../components/Loading'
import type { Item } from '../types'
import './ListItems.css'

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

  const onCreateItem = () => navigate('/items/create')

  const onUpdateItem = (item: Item) => navigate(`/items/${item.id}`)

  return (
    <div className="page">
      <div className="list-items-header">
        <h3>Items</h3>
        <Button appearance="primary" onClick={onCreateItem}>Create Item</Button>
      </div>
      {
        data && !isPending
          ? <ItemsTable data={data} onManageInventory={onManageInventory} onUpdateItem={onUpdateItem} onDeleteItem={onDeleteItem}></ItemsTable>
          : <Loading />
      }
    </div>
  )
}

export default ItemsPage
