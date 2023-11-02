import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('inventory', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw(`uuid_generate_v4()`))
    table.uuid('item_id').references('item.id')
    table.text('serial').checkLength('<=', 127).notNullable()
    table.timestamp('created_at', { useTz: false }).defaultTo(knex.raw(`(now() at time zone 'utc')`))

    table.index(['item_id', 'created_at'])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('inventory')
}
