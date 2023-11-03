import connection from './connections'
import helpers from './helpers'
import { onQueryError } from './events'

connection.on('query-error', onQueryError)

export default connection
export {
  helpers,
}
