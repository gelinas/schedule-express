require("dotenv").config();

const config = {
  development: {
    username: process.env.DB_DEV_USERNAME,
    password: process.env.DB_DEV_PASSWORD,
    database: process.env.DB_DEV_DATABASE,
    host: process.env.DB_DEV_HOSTNAME,
    dialect: "postgres",
    operatorsAliases: 0,
    logging: false,
    ssl: Boolean(process.env.DB_DIALECT_SSL === "true"),
    dialectOptions: {
      ssl: Boolean(process.env.DB_DIALECT_SSL === "true") && {
        require: true,
        rejectUnauthorized: false,
      },
      encrypt: Boolean(process.env.DB_DIALECT_ENCRYPT === "true"),
    },
  },
  production: {
    username: process.env.DB_PROD_USERNAME,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_DATABASE,
    host: process.env.DB_PROD_HOSTNAME,
    dialect: "postgres",
    operatorsAliases: 0,
    logging: false,
    ssl: Boolean(process.env.DB_DIALECT_SSL === "true"),
    dialectOptions: {
      ssl: Boolean(process.env.DB_DIALECT_SSL === "true") && {
        require: true,
        rejectUnauthorized: false,
      },
      encrypt: Boolean(process.env.DB_DIALECT_ENCRYPT === "true"),
    },
  },
};

module.exports = config;
