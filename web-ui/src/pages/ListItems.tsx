import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'rsuite'
import { Faker, en } from '@faker-js/faker'
import * as api from '../api'
import ItemsTable from '../components/ItemsTable'
import Loading from '../components/Loading'
import type { Item, NewItem } from '../types'
import './ListItems.css'

function ItemsPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const customFaker = new Faker({ locale: [en] })

  const { isPending, data } = useQuery({ queryKey: ['items'], queryFn: api.findAllItems })

  const deleteItemMutation = useMutation({
    mutationFn: (id: string) => api.deleteItemById(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['items'] }),
  })

  const createRandomItemMutation = useMutation({
    mutationFn: (item: NewItem) => api.createItem(item),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['items'] }),
  })

  const onDeleteItem = (item: Item) => deleteItemMutation.mutate(item.id)

  const onManageInventory = (item: Item) => navigate(`/items/${item.id}/inventory`)

  const onCreateItem = () => navigate('/items/create')

  const onCreateRandomItem = () => {
    // Create random data
    const name = customFaker.commerce.product()
    const description = customFaker.commerce.productDescription()

    const newItem = {
      name,
      description,
    }

    // Call API with the random data
    createRandomItemMutation.mutate(newItem)

    // Ensure table list updates with that new item
    // ^ Handled by react query b/c of query invalidation
  }

  const onUpdateItem = (item: Item) => navigate(`/items/${item.id}`)

  return (
    <div className="page">
      <div className="list-items-header">
        <h3>Items</h3>
        <Button appearance="primary" onClick={onCreateRandomItem}>Create Random Item</Button>
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
