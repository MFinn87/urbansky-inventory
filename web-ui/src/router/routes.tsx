import Items from '../pages/Items'
import Inventory from '../pages/Inventory'
import InventoryByItemId from '../pages/InventoryByItemId'

const routes = [
  {
    path: '/items',
    element: <Items />,
  },
  {
    path: '/items/:itemId/inventory',
    element: <InventoryByItemId />,
  },
  {
    path: '/inventory',
    element: <Inventory />,
  },
]

export default routes
