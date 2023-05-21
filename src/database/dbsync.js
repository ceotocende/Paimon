const { Sequelize } = require('sequelize');
const sequelize = require('./sequelize.js');
const usersMessages = require('./model/messagesUsers.js')(sequelize, Sequelize.DataTypes);

usersMessages.sync();

try {
    sequelize.authenticate();
    console.log('База данных загружена');
} catch (error) {
    console.error('Невозможно подключиться к базе данных:', error);
}

module.exports = sequelize;