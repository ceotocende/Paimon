const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const { loadEvents } = require('./src/functions/handlers/handleEvents.js');
const token = process.env.TOKEN;

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