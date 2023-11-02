import { FastifyPluginAsync } from 'fastify'
import type { FastifyTypebox } from '../lib/types'

import itemService from '../modules/item/item.service'
import ItemModel from '../modules/item/item.model'

const routes: FastifyPluginAsync = async (fastify: FastifyTypebox): Promise<void> => {
  const {
    findMany,
    findById,
    createMany,
    deleteById,
    updateById,
  } = fastify.createApiSchemas(ItemModel)

  fastify.get('/items', { schema: findMany }, itemService.findMany)
  fastify.get('/items/:id', { schema: findById }, (request) => itemService.findOneById(request.params.id))
  fastify.post('/items', { schema: createMany }, itemService.createMany)
  fastify.put('/items/:id', { schema: updateById }, (request) => itemService.updateOne({ ...request.body, id: request.params.id }))
  fastify.delete('/items/:id', { schema: deleteById }, (request) => itemService.deleteOneById(request.params.id))
}

export default routes
