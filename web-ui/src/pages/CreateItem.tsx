import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import * as api from '../api'
import ItemForm from '../components/ItemForm'
import type { NewItem } from '../types'

function CreateItem() {
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: (item: NewItem) => api.createItem(item),
    onSuccess: () => navigate('/items'),
  })

  const onCancel = () => navigate('/items')

  const onSave = (item: NewItem) => {
    mutation.mutate(item)
  }

  return (
    <div className="page">
      <ItemForm onCancel={onCancel} onSave={onSave}/>
    </div>
  )
}

export default CreateItem
