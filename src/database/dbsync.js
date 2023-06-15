const { Sequelize } = require('sequelize');
const sequelize = require('./sequelize.js');
const Users = require('./model/Users.js')(sequelize, Sequelize.DataTypes);

Users.sync();

try {
    sequelize.authenticate();
    console.log('База данных загружена');
} catch (error) {
    console.error('Невозможно подключиться к базе данных:', error);
}

module.exports = sequelize;