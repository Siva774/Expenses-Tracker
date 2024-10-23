const { Sequelize } = require('sequelize');
const path = require('path');

// Initialize Sequelize for SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database/expense_tracker.sqlite'),  
});

module.exports = sequelize;
