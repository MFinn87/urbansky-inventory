import Knex from 'knex'
import databaseConfig from '../config'

const knex = Knex(databaseConfig)

// TODO: Later on, handle read-replica
export default knex
