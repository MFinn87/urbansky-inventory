const x509Certificate = process.env.DATABASE_SSL_CERTIFICATE

const ssl = x509Certificate
  ? {
    rejectUnauthorized: false,
    ca: x509Certificate,
  }
  : null

// TODO: Handle read-replicas' connection later
const connection = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl,
}

const config = {
  client: 'pg',
  pool: {
    min: 2,
    max: 8,
  },
  connection,
  migrations: {
    tableName: 'knex_migrations',
    directory: '../migrations',
    stub: 'migration_template.js',
    loadExtensions: ['.js', '.mjs', '.cjs'],
  },
  seeds: {
    directory: '../seeds',
    loadExtensions: ['.js', '.mjs', '.cjs'],
  },
} as any

export default config
