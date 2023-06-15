const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('paimon', 'vexify', 'xayahmylovepls1', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

module.exports = sequelize;