import { map } from 'lodash'
import {
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import routes from './routes'

function Router() {

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/items"></Navigate>}></Route>
        {
          map(routes, (route) => <Route key={route.path} path={route.path} element={route.element}></Route>)
        }
      <Route path="*" element={<Navigate replace to="/items"></Navigate>}></Route>
    </Routes>
  )
}

export default Router
