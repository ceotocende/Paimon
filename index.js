const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const { loadEvents } = require('./src/functions/handlers/handleEvents.js');
const { loadCommands } = require('./src/functions/handlers/handleCommands.js');
const token = process.env.TOKEN;
const sequelize = require('./src/database/dbsync.js')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates
  ]
});

(async () => {
  loadEvents(client);
  client.login(token)
})();