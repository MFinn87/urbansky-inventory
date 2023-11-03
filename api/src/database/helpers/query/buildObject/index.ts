import { keys, reduce } from 'lodash'
import { Knex } from 'knex'

export const buildObjectSelector = (selectClause: Record<string, string | Knex.Raw>) => {
  const fields = keys(selectClause)

  const jsonObjectToBuild = reduce(fields, (buildingJson, _field, index) => {
      const lastCharacter = (index === fields.length - 1 ? '' : ', ')

      return buildingJson.concat(`?::text, ??${lastCharacter}`)
    },
    '',
  )

  const parameterizedValues = reduce(fields, (buildingParameterizedValues: (string | Knex.Raw)[], field: string) => [
    ...buildingParameterizedValues,
    ...[field, selectClause[field]],
  ], [])

  return {
    selector: `jsonb_build_object( ${jsonObjectToBuild} )`,
    values: parameterizedValues,
  }
}

const useBuildObject = (knex: Knex) => (objectData: Record<string, string | Knex.Raw>) => {
  const builtObject = buildObjectSelector(objectData)

  return knex.raw(builtObject.selector, builtObject.values)
}

export default useBuildObject
