import { ReadonlyKeysOf } from 'type-fest'
import { TSchema, Type, Static, TOmit } from '@sinclair/typebox'
import { filter, find, keys } from 'lodash'

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

export const deleteSuccess = {
  result: 'Ok',
}

export const createModel = <T extends typeof Model>(description: string, baseModel: T) => Type
  .Composite([ baseModel ], { additionalProperties: false, description })
