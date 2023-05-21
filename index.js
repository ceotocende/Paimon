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

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  let user = message.author.id;
  if (message.content === 'перезагрузить' && (user === '515575447124181007' || user === '597459182794309632')) {
    (async () => {
      loadCommands(client)
      message.reply(`перезагружены чек консоль`)
    })();
  }
})