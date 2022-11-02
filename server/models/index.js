const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Models
db.Books = require('./Book')(sequelize, Sequelize);

module.exports = db;
