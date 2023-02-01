require('dotenv').config();
import { Sequelize } from 'sequelize';
import cls from 'cls-hooked';

const namespace = cls.createNamespace('sequelize-orm-meetup');
Sequelize.useCLS(namespace);

// const env = process.env.NODE_ENV || 'development';
// const config = require('../config/config')[env];

// a sequelize instance connecting to a sqlite3 database

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './schedule_db.db',
});

console.log('boop');

sequelize
  .authenticate()
  .then(() => {
    console.info(`  [DB]: Database connected to ${sequelize.getDialect()}`);
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
