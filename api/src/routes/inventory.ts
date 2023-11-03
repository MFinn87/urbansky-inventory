import { v4 as uuid } from 'uuid'
import { map } from 'lodash'
import { FastifyPluginAsync } from 'fastify'
import type { FastifyTypebox } from '../types'

import inventoryService from '../modules/inventory/inventory.service'
import InventoryModel from '../modules/inventory/inventory.model'
import { UUID } from '../helpers/models'

const routes: FastifyPluginAsync = async (fastify: FastifyTypebox): Promise<void> => {
  // These API Schemas:
  //    Are used to auto-generate Swagger documentation,
  //    Are used by Fastify to auto-implement request/response body
  //      validation against missing fields, invalid data types,
  //      remove extra fields, etc.
  const {
    findMany,
    findById,
    createMany,
    deleteById,
    updateById,
    setQueryParameters,
  } = fastify.createApiSchemas(InventoryModel)

  fastify.get(
    '/inventory',
    {
      schema: {
        ...findMany,
        querystring: setQueryParameters({
          itemId: UUID({ description: 'An itemId to filter Inventory records. (Optional)' }),
        }),
      },
    }, async (request) => {
    const inventory = request.query.itemId
      ? await inventoryService.findManyByItemId(request.query.itemId)
      : await inventoryService.findMany()

    return inventory
  })

  fastify.get('/inventory/:id', { schema: findById }, async (request) => {
    const inventory = await inventoryService.findOneById(request.params.id)

    return inventory
  })

  fastify.post('/inventory', { schema: createMany }, async (request) => {
    const newInventory = map(request.body, (inventoryRecord) => ({
      ...inventoryRecord,
      id: uuid(),
    }))
    const createdInventory = await inventoryService.createMany(newInventory)

    return createdInventory
  })

  fastify.put('/inventory/:id', { schema: updateById }, async (request) => {
    const updatedInventory = await inventoryService.updateOne({ ...request.body, id: request.params.id })

    return updatedInventory
  })

  fastify.delete('/inventory/:id', { schema: deleteById }, async (request) => {
    const deleteResult = inventoryService.deleteOneById(request.params.id)

    return deleteResult
  })
}

export default routes
