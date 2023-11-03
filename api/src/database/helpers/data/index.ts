import {
  filter,
  isArray,
  keys,
  map,
  reduce,
} from 'lodash'
import { Knex } from 'knex'

const deleteManyWhereStillExistsButShouldnt = (knex: Knex, datas: any[], tableName: string, uniqueBy = 'id') => knex
  .del()
  .from(tableName)
  .whereNotIn(uniqueBy, map(datas, (data) => data[uniqueBy]))

const updateOneWhereStillExists = (knex: Knex, tableName: string, uniqueBy = 'id') => (data: any) => knex
  .update(
    reduce(
      filter(keys(data), (key: string) => key !== uniqueBy),
      (buildingUpdateObject, key) => ({
        ...buildingUpdateObject,
        [key]: data[key],
      }),
      {},
    ),
  )
  .from(tableName)
  .where(uniqueBy, '=', data[uniqueBy])

const updateManyWhereStillExists = (knex: Knex, datas: any[], tableName: string, uniqueBy = 'id') => Promise.all(
  map(datas, updateOneWhereStillExists(knex, tableName, uniqueBy))
)

const insertManyWhereNew = (knex: Knex, datas: any[], tableName: string) => knex
  .insert(datas)
  .into(tableName)
  .onConflict()
  .ignore()

const useDataSeeder = (knex: Knex) => async (datas: any[], tableName: string, options = { uniqueBy: 'id' }): Promise<void> => {
  const { uniqueBy } = options

  await deleteManyWhereStillExistsButShouldnt(knex, datas, tableName, uniqueBy)
  await updateManyWhereStillExists(knex, datas, tableName, uniqueBy)
  await insertManyWhereNew(knex, datas, tableName)
}

const arrayify = (data: any | any[]) => isArray(data)
  ? data
  : [data]

const first = (data: any[]) => data[0] || null

export default {
  arrayify,
  first,
  useDataSeeder,
}
