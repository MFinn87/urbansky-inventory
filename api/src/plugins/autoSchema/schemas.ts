import { TSchema, Type } from '@sinclair/typebox'
import { startCase, toLower } from 'lodash'
import { Nullable, UUID, omitReadOnly } from '../../lib/models'
// import { FastifySchema } from 'fastify'
import pluralize from 'pluralize'

export const ResourceIdentifier = Type.Object({
  id: UUID(),
}, { description: '' })

const toTitleCase = (text: string) => startCase(toLower(text))

// TODO: Add back in all  satisfies FastifySchema s
export const createFindManySchema = <T extends TSchema>(baseSchema: T) => ({
  tags: [toTitleCase(pluralize(baseSchema.description || ''))],
  summary: `Find many ${pluralize(baseSchema.description || '')}`,
  description: `Find many ${baseSchema.description} records.`,
  response: {
    200: Type.Array(baseSchema),
  },
})

export const createFindByIdSchema = <T extends TSchema>(baseSchema: T) => ({
  tags: [toTitleCase(pluralize(baseSchema.description || ''))],
  summary: `Find one ${baseSchema.description || ''} by id`,
  description: `Find one ${baseSchema.description || ''} record by id.`,
  params: ResourceIdentifier,
  response: {
    200: Nullable(baseSchema),
  },
})

export const createUpdateByIdSchema = <T extends TSchema>(baseSchema: T) => ({
  tags: [toTitleCase(pluralize(baseSchema.description || ''))],
  summary: `Update one ${baseSchema.description || ''} by id`,
  description: `Update one ${baseSchema.description || ''} record by id. The request body should be a/an ${baseSchema.description || ''} object with all fields, so the update can be considered a complete replacement. The response back is the state of the ${baseSchema.description || ''} record after the update has been committed. This route is idempotent.`,
  params: ResourceIdentifier,
  body: omitReadOnly(baseSchema),
  response: {
    200: Nullable(baseSchema),
  },
})

export const createUpdateManySchema = <T extends TSchema>(baseSchema: T) => ({
  tags: [toTitleCase(pluralize(baseSchema.description || ''))],
  summary: `Update many ${pluralize(baseSchema.description || '')}`,
  description: `Update many ${baseSchema.description || ''} records. The request body should be an array of ${baseSchema.description || ''} objects, where each object has all fields, so all updates can be considered complete replacements. The response back is an array of the ${baseSchema.description || ''} records after the updates have been committed. This route is idempotent.`,
  body: Type.Array(omitReadOnly(baseSchema)),
  response: {
    200: Type.Array(baseSchema),
  },
})

export const createCreateManySchema = <T extends typeof ResourceIdentifier>(baseSchema: T) => ({
  tags: [toTitleCase(pluralize(baseSchema.description || ''))],
  summary: `Create many ${pluralize(baseSchema.description || '')}`,
  description: `Create many ${baseSchema.description || ''} records. The request body should be an array of ${baseSchema.description || ''} objects without ids. Ids will be assigned server-side. The response back is an array of created ${baseSchema.description || ''} records, including their ids.`,
  body: Type.Array(omitReadOnly(Type.Omit(baseSchema, ['id']))),
  response: {
    200: Type.Array(baseSchema),
  },
})

export const createDeleteByIdSchema = <T extends TSchema>(baseSchema: T) => ({
  tags: [toTitleCase(pluralize(baseSchema.description || ''))],
  summary: `Delete one ${baseSchema.description || ''} by id`,
  description: `Delete one ${baseSchema.description || ''} record by id. The response back is a JSON object containing a success message.`,
  params: ResourceIdentifier,
  response: {
    200: Type.Object({
      result: Type.String({ default: 'Ok' }),
    }),
  },
})