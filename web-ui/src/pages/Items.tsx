import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import * as api from '../api'
import ItemsTable from '../components/ItemsTable'
import Loading from '../components/Loading'
import type { Item } from '../types'

function ItemsPage() {
  const navigate = useNavigate()
  const onManageInventory = (item: Item) => {
    console.log('DEBUG WOULD MANAGE: ', item)

    navigate(`/items/${item.id}/inventory`)
  }

  const { isPending, data } = useQuery({ queryKey: ['items'], queryFn: api.findAllItems })

  return (
    <div className="page">
      <div>Items</div>
      {
        data && !isPending
          ? <ItemsTable data={data} onManageInventory={onManageInventory}></ItemsTable>
          : <Loading />
      }
    </div>
  )
}

export default ItemsPage
