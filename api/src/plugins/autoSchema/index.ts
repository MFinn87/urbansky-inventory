import fp from 'fastify-plugin'
import {
  createCreateManySchema,
  createFindManySchema,
  createFindByIdSchema,
  createUpdateByIdSchema,
  createUpdateManySchema,
  createDeleteByIdSchema,
  ResourceIdentifier,
} from './schemas'
import type { FastifyInstance } from 'fastify'

const createApiSchemas = <T extends typeof ResourceIdentifier>(entity: T) => ({
  findMany: createFindManySchema(entity),
  findById: createFindByIdSchema(entity),
  updateById: createUpdateByIdSchema(entity),
  updateMany: createUpdateManySchema(entity),
  createMany: createCreateManySchema(entity),
  deleteById: createDeleteByIdSchema(entity),
})

const loadPlugin = (fastify: FastifyInstance, options: any, done: any) => {
  fastify.decorate('createApiSchemas', createApiSchemas)
  fastify.decorate('createFindManySchema', createFindManySchema)
  fastify.decorate('createFindByIdSchema', createFindByIdSchema)
  fastify.decorate('createUpdateByIdSchema', createUpdateByIdSchema)
  fastify.decorate('createUpdateManySchema', createUpdateManySchema)
  fastify.decorate('createCreateManySchema', createCreateManySchema)
  fastify.decorate('createDeleteByIdSchema', createDeleteByIdSchema)

  done()
}

declare module 'fastify' {
  interface FastifyInstance {
    createApiSchemas: typeof createApiSchemas,
    createFindManySchema: typeof createFindManySchema,
    createFindByIdSchema: typeof createFindByIdSchema,
    createUpdateByIdSchema: typeof createUpdateByIdSchema,
    createUpdateManySchema: typeof createUpdateManySchema,
    createCreateManySchema: typeof createCreateManySchema,
    createDeleteByIdSchema: typeof createDeleteByIdSchema,
  }
}

export default fp(loadPlugin, {
  fastify: '4.x',
  name: 'autoSchema',
})
