// Purpose: Configuration file for Knex.js
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/data.sqlite'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
  }
};
