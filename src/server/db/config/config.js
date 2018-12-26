require('dotenv').config()

module.exports = {
  development: {
    dialect: 'postgres',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    migrationStorage: 'json',
    migrationStoragePath: 'migrationsExecuted.json',
    seederStorage: 'json',
    seederStoragePath: 'seedersExecuted.json',
    operatorsAliases: false,
  },
  test: {
    dialect: 'postgres',
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOSTNAME,
    logging: false,
  },
  production: {
    dialect: 'postgres',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    logging: false,
    // ssl: true,
    // dialectOptions: {
    //   ssl: true,
    // },
  },
}
