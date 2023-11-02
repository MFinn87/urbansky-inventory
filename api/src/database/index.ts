import connection from './connections'
// TODO: Bring in helpers!
import { onQueryError } from './events'

connection.on('query-error', onQueryError)

const helpers = {}

export default connection
export {
  helpers,
}
