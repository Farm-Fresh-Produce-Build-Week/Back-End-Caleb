// Update with your config settings.
const dbConnection=process.env.DATABASE_URL;

require("dotenv").config();
module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: { filename: "./database/farmer.db3" },
    migrations: {
      directory: "./database/migrations/"
    },
    seeds: {
      directory: "./database/seeds/"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys=ON", done);
      }
    }
  },
  production: {
    client: "pg",
    connection: dbConnection,
    useNullAsDefault: true,
    migrations: {
      directory: __dirname+"./data/migrations"
    },
    seeds: {
      directory: __dirname+"./data/seeds"
    }
  }
};
