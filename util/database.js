const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Jalal@2024', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
