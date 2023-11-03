import { v4 as uuid } from 'uuid'
import { map } from 'lodash'
import { FastifyPluginAsync } from 'fastify'
import type { FastifyTypebox } from '../types'

import itemService from '../modules/item/item.service'
import ItemModel from '../modules/item/item.model'

const routes: FastifyPluginAsync = async (fastify: FastifyTypebox): Promise<void> => {
  // These API Schemas auto-generate Swagger documentation,
  // and will be used by Fastify auto-implment request/response validation.
  const {
    findMany,
    findById,
    createMany,
    deleteById,
    updateById,
  } = fastify.createApiSchemas(ItemModel)

  fastify.get('/items', { schema: findMany }, async () => {
    const items = await itemService.findMany()

    return items
  })

  fastify.get('/items/:id', { schema: findById }, async (request) => {
    const item = await itemService.findOneById(request.params.id)

    return item
  })

  fastify.post('/items', { schema: createMany }, async (request) => {
    const newItems = map(request.body, (item) => ({
      ...item,
      id: uuid(),
    }))
    const createdItems = await itemService.createMany(newItems)

    return createdItems
  })

  fastify.put('/items/:id', { schema: updateById }, async (request) => {
    const updatedItem = await itemService.updateOne({ ...request.body, id: request.params.id })

    return updatedItem
  })

  fastify.delete('/items/:id', { schema: deleteById }, async (request) => {
    const deleteResult = itemService.deleteOneById(request.params.id)

    return deleteResult
  })
}

export default routes
