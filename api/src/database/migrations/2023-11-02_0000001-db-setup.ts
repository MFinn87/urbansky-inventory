import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
  await knex.schema.raw(`CREATE EXTENSION IF NOT EXISTS "citext";`)
  await knex.schema.raw(`CREATE EXTENSION IF NOT EXISTS "unaccent";`)
}

export async function down(): Promise<void> {
  
}
