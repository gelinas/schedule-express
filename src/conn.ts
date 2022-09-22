require('dotenv').config();
import { Sequelize } from 'sequelize';
import cls from 'cls-hooked';

const namespace = cls.createNamespace('sequelize-orm-meetup');
Sequelize.useCLS(namespace);

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

export const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: 5432,
  dialect: 'postgres',
  ssl: Boolean(process.env.DB_DIALECT_SSL === 'true'),
  dialectOptions: {
    ssl: Boolean(process.env.DB_DIALECT_SSL === 'true') && {
      require: true,
      rejectUnauthorized: false,
    },
    encrypt: Boolean(process.env.DB_DIALECT_ENCRYPT === 'true'),
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: config.logging,
});

sequelize
  .authenticate()
  .then(() => {
    console.info(`  [DB]: Database connected to ${config.username}@${config.database}:${config.host}`);
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
