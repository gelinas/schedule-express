require('dotenv').config();

const config = {
  development: {
    dialect: 'sqlite',
    storage: './schedule_db.db',
  },
  production: {
    dialect: 'sqlite',
    storage: './schedule_db.db',
  },
};

module.exports = config;
