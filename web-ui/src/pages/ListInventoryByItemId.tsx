import { useParams, useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'rsuite'
import * as api from '../api'
import InventoryTable from '../components/InventoryTable'
import InventoryItemSummary from '../components/InventoryItemSummary'
import Loading from '../components/Loading'
import type { Inventory } from '../types'
import './ListInventoryByItemId.css'

function ListInventoryByItemId() {
  const navigate = useNavigate()
  const { itemId } = useParams() as { itemId: string }
  const queryClient = useQueryClient()
  const { isPending: isInventoryQueryPending, data: inventoryData } = useQuery({ queryKey: ['inventory', itemId], queryFn: api.findAllInventoryByItemId(itemId || null) })
  const { isPending: isItemQueryPending, data: itemData } = useQuery({ queryKey: ['item', itemId], queryFn: api.findItemById(itemId) })

  const mutation = useMutation({
    mutationFn: (id: string) => api.deleteInventoryById(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inventory', itemId] }),
  })

  const onCreateInventory = () => navigate(`/items/${itemId}/inventory/create`)

  const onDelete = (inventory: Inventory) => mutation.mutate(inventory.id)

  const navigateBackToAllItems = () => navigate('/items')

  return (
    <div className="page">
      <div className="list-inventory-top-header">
        <div><h3>Item</h3></div>
        { itemData && !isItemQueryPending && <InventoryItemSummary item={itemData} /> }
      </div>
      {
        inventoryData && itemData && !isInventoryQueryPending && !isItemQueryPending
          ? <div className="list-inventory-bottom-header">
              <div><h3>Inventory</h3></div>
              { itemData && !isItemQueryPending && <Button appearance="primary" onClick={onCreateInventory}>Create Inventory</Button> }
            </div>
          : <Loading />
      }
      { inventoryData && !isInventoryQueryPending && <InventoryTable data={inventoryData} onDelete={onDelete}></InventoryTable> }
      <Button appearance="primary" onClick={navigateBackToAllItems}>Back To All Items</Button> 
    </div>
  )
}

export default ListInventoryByItemId
