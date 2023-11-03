import Knex from 'knex'
import config from '../config'
import items from './items.json'
import inventory from './inventory.json'

const seed = async () => {
  if (process.env.NODE_ENV !== 'local') {
    return
  }

  const knex = Knex(config)

  await knex.transaction(async (transaction) => {
    await transaction
      .insert(items)
      .into('item')
      .onConflict()
      .ignore()

    await transaction
      .insert(inventory)
      .into('inventory')
      .onConflict()
      .ignore()
  })

  console.log('Successfully seeded local dev data!')

  process.exit(0)
}

seed()
