import fp from 'fastify-plugin'
import {
  createCreateManySchema,
  createFindManySchema,
  createFindByIdSchema,
  createFindManyByParentIdSchema,
  createUpdateByIdSchema,
  createUpdateManySchema,
  createDeleteByIdSchema,
  ResourceIdentifier,
  setQueryParameters,
} from './schemas'
import type { FastifyInstance } from 'fastify'

const createApiSchemas = <T extends typeof ResourceIdentifier>(entity: T) => ({
  findMany: createFindManySchema(entity),
  findById: createFindByIdSchema(entity),
  findManyByParentId: createFindManyByParentIdSchema(entity),
  updateById: createUpdateByIdSchema(entity),
  updateMany: createUpdateManySchema(entity),
  createMany: createCreateManySchema(entity),
  deleteById: createDeleteByIdSchema(entity),
  setQueryParameters,
})

const loadPlugin = (fastify: FastifyInstance, options: any, done: any) => {
  fastify.decorate('createApiSchemas', createApiSchemas)
  fastify.decorate('createFindManySchema', createFindManySchema)
  fastify.decorate('createFindByIdSchema', createFindByIdSchema)
  fastify.decorate('findManyByParentId', createFindManyByParentIdSchema)
  fastify.decorate('createUpdateByIdSchema', createUpdateByIdSchema)
  fastify.decorate('createUpdateManySchema', createUpdateManySchema)
  fastify.decorate('createCreateManySchema', createCreateManySchema)
  fastify.decorate('createDeleteByIdSchema', createDeleteByIdSchema)
  fastify.decorate('setQueryParameters', setQueryParameters)

  done()
}

declare module 'fastify' {
  interface FastifyInstance {
    createApiSchemas: typeof createApiSchemas,
    createFindManySchema: typeof createFindManySchema,
    createFindByIdSchema: typeof createFindByIdSchema,
    findManyByParentId: typeof createFindManyByParentIdSchema,
    createUpdateByIdSchema: typeof createUpdateByIdSchema,
    createUpdateManySchema: typeof createUpdateManySchema,
    createCreateManySchema: typeof createCreateManySchema,
    createDeleteByIdSchema: typeof createDeleteByIdSchema,
    setQueryParameters: typeof setQueryParameters,
  }
}

export default fp(loadPlugin, {
  fastify: '4.x',
  name: 'autoSchema',
})
