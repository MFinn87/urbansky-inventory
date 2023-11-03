import { ReadonlyKeysOf } from 'type-fest'
import { TSchema, Type, Static, TOmit } from '@sinclair/typebox'
import { filter, find, keys, isUndefined, omitBy } from 'lodash'

export const Nullable = <T extends TSchema>(schema: T) => Type.Unsafe<Static<T> | null>({ 
  ...schema,
  nullable: true
})

export const UUID = ({ description }: { description: string } = { description: 'Uniquely identifies a record' }) => Type.String({
  description,
  format: 'uuid',
  pattern: '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}',
  minLength: 36,
  maxLength: 36,
})

const Model = Type.Object({})

export const omitReadOnly = <T extends TSchema>(baseSchema: T) => Type.Omit(
  baseSchema,
  // @ts-ignore
  filter(
    keys(baseSchema.properties),
    (key) => {
      const isReadOnly = !!find(
        Object.getOwnPropertySymbols(baseSchema.properties[key]),
        (symbol) => symbol.toString() === 'Symbol(TypeBox.Readonly)'
      )

      return isReadOnly
    }
  ),
) as unknown as TOmit<T, ReadonlyKeysOf<Static<typeof baseSchema>>>


const IdentifiableRecord = Type.Object({
  id: UUID({ description: 'Uniquely identifies a record' }),
})

export const createRelatedModels = <T extends typeof IdentifiableRecord> (baseModel: T) => {
  const NewModel = omitReadOnly(Type.Composite([baseModel], { additionalProperties: false, description: baseModel.description }))

  const UpdateModel = Type.Composite([ Type.Pick(baseModel, ['id']), Type.Partial(NewModel) ], { additionalProperties: false, description: baseModel.description })

  return [NewModel, UpdateModel] as const
}

export const deleteSuccess = {
  result: 'Ok',
}

export const createModel = <T extends typeof Model>(description: string, baseModel: T) => Type
  .Composite([ baseModel ], { additionalProperties: false, description })

export const prepareForDatabase = <T extends Record<string, any>>(data: T) => omitBy(data, isUndefined) as Partial<T>
