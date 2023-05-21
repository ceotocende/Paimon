const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_pg', 'ceotocende', 'xayahmylovepls1', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    // storage: './src/database/db/database.sqlite'
});

module.exports = sequelize;