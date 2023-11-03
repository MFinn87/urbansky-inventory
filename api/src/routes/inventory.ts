import { FastifyPluginAsync } from 'fastify'
import type { FastifyTypebox } from '../types'

import inventoryService from '../modules/inventory/inventory.service'
import InventoryModel from '../modules/inventory/inventory.model'

const routes: FastifyPluginAsync = async (fastify: FastifyTypebox): Promise<void> => {
  // These API Schemas auto-generate Swagger documentation,
  // and will be used by Fastify auto-implment request/response validation.
  const {
    findMany,
    findById,
    createMany,
    deleteById,
    updateById,
  } = fastify.createApiSchemas(InventoryModel)

  fastify.get('/inventory', { schema: findMany }, inventoryService.findMany)
  fastify.get('/inventory/:id', { schema: findById }, (request) => inventoryService.findOneById(request.params.id))
  fastify.post('/inventory', { schema: createMany }, inventoryService.createMany)
  fastify.put('/inventory/:id', { schema: updateById }, (request) => inventoryService.updateOne({ ...request.body, id: request.params.id }))
  fastify.delete('/inventory/:id', { schema: deleteById }, (request) => inventoryService.deleteOneById(request.params.id))
}

export default routes
