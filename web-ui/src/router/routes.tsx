import CreateItem from '../pages/CreateItem'
import CreateInventory from '../pages/CreateInventory'
import ListItems from '../pages/ListItems'
import ListInventory from '../pages/ListInventory'
import ListInventoryByItemId from '../pages/ListInventoryByItemId'
import UpdateItem from '../pages/UpdateItem'

const routes = [
  {
    path: '/items',
    element: <ListItems />,
  },
  {
    path: '/items/:itemId',
    element: <UpdateItem />,
  },
  {
    path: '/items/:itemId/inventory',
    element: <ListInventoryByItemId />,
  },
  {
    path: '/inventory',
    element: <ListInventory />,
  },
  {
    path: '/items/create',
    element: <CreateItem />,
  },
  {
    path: '/items/:itemId/inventory/create',
    element: <CreateInventory />,
  }
]

export default routes
