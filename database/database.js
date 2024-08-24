const Sequelize = require('sequelize');

const connection = new Sequelize('guiapergunte', 'root', 'root',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;

