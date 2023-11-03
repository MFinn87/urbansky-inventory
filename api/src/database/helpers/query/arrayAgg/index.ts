import { Knex } from 'knex'
import { buildObjectSelector } from '../buildObject'

type ArrayAgg = Knex.Raw & {
  arrayAggModifiers: {
    whereCondition: string,
    orderByCondition: string
  },
  where: (whereCondition: string) => ArrayAgg,
  orderBy: (orderByCondition: string) => ArrayAgg,
}

type ArrayAggObjectSelectClause = Record<string, string | Knex.Raw>

type ArrayAggStringSelectClause = string

type ArrayAggSelectClause = ArrayAggObjectSelectClause | ArrayAggStringSelectClause

const buildStringSelector = (selectClause: ArrayAggStringSelectClause) => ({
  selector: '??',
  values: selectClause,
})

const useArrayAgg = (knex: Knex) => (selectClause: ArrayAggSelectClause) => {
  const { selector, values } = (typeof selectClause === 'string')
    ? buildStringSelector(selectClause as ArrayAggStringSelectClause)
    : buildObjectSelector(selectClause as ArrayAggObjectSelectClause)

  const evaluate = ({ whereCondition, orderByCondition }: { whereCondition: string, orderByCondition: string }) => {
    const whereClause = whereCondition ? `FILTER (WHERE ${whereCondition})` : ''
    const orderByClause = orderByCondition ? `ORDER BY ${orderByCondition}` : ''

    const sql: any = knex.raw(`COALESCE(ARRAY_AGG(${selector} ${orderByClause}) ${whereClause}, '{}')`, values)
    
    sql.arrayAggModifiers = {
      whereCondition,
      orderByCondition,
    }

    sql.where = (newWhereCondition: string) => evaluate({ whereCondition: newWhereCondition, orderByCondition: sql.arrayAggModifiers.orderByCondition })

    sql.orderBy = (newOrderByCondition: string) => evaluate({ whereCondition: sql.arrayAggModifiers.whereCondition, orderByCondition: newOrderByCondition })

    return sql as ArrayAgg
  }

  return evaluate({
    whereCondition: '',
    orderByCondition: '',
  })
}

export default useArrayAgg
