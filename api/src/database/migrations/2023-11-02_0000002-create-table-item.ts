import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('item', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw(`uuid_generate_v4()`))

    table.specificType('name', 'citext').checkLength('<=', 63).notNullable()
    table.specificType('description', 'citext').checkLength('<=', 127).notNullable()
    table.timestamp('created_at', { useTz: false }).defaultTo(knex.raw(`(now() at time zone 'utc')`))

    table.index(['created_at'])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('item')
}
