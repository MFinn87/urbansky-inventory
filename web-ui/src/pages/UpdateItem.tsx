import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import * as api from '../api'
import ItemForm from '../components/ItemForm'
import Loading from '../components/Loading'
import type { UpdateItem, NewItem } from '../types'

function UpdateItemPage() {
  const navigate = useNavigate()
  const { itemId } = useParams() as { itemId: string }

  const { isPending, data } = useQuery({ queryKey: ['item', itemId], queryFn: api.findItemById(itemId) })

  const mutation = useMutation({
    mutationFn: (inventory: UpdateItem) => api.updateItem(inventory),
    onSuccess: () => navigate(`/items`),
  })

  const onCancel = () => navigate(`/items`)

  const onSave = (item: NewItem) => {
    const updatingItem = {
      id: itemId,
      ...item,
    }
    mutation.mutate(updatingItem)
  }

  return (
    <div className="page">
      { data && !isPending
        ? <ItemForm onCancel={onCancel} onSave={onSave} initialValue={data}/>
        : <Loading />
      }
    </div>
  )
}

export default UpdateItemPage
