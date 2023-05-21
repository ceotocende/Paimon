const { loadCommands } = require("../../../functions/handlers/handleCommands");
// const sequelize = require('../../../database/dbsync.js');

module.exports = {
  name: "ready",
  async execute(client) {
    loadCommands(client)
    console.log(`Бот ${client.user.tag} работает`);
  },
  sequelize,
};