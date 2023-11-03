import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import * as api from '../api'
import InventoryForm from '../components/InventoryForm'
import Loading from '../components/Loading'
import type { NewInventory } from '../types'

function CreateInventory() {
  const navigate = useNavigate()
  const { itemId } = useParams() as { itemId: string }

  const { isPending, data } = useQuery({ queryKey: ['item', itemId], queryFn: api.findItemById(itemId) })

  const mutation = useMutation({
    mutationFn: (inventory: NewInventory) => api.createInventory(inventory),
    onSuccess: () => navigate(`/items/${itemId}/inventory`),
  })

  const onCancel = () => navigate(`/items/${itemId}/inventory`)

  const onSave = (item: NewInventory) => {
    mutation.mutate(item)
  }

  return (
    <div className="page">
      { data && !isPending
        ? <InventoryForm onCancel={onCancel} onSave={onSave} item={data}/>
        : <Loading />
      }
    </div>
  )
}

export default CreateInventory
