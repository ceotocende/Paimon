const addBalance = require("../../../database/functions/addBalance");
const { emojis_guilds } = require('../../../utils/emoji.json')
let messageCout = 0;

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;
        console.log(`
----------------------------------------------------------------------------
${message.channel.name}
${message.author.tag}
${message.content}
${Date.now()}
----------------------------------------------------------------------------
        `)
        addBalance(message.author.id, 1);
        const randomEmoji = emojis_guilds[Math.floor(Math.random() * emojis_guilds.length)];
        if (messageCout === 20) {
            messageCout = 0;
            message.react(randomEmoji)
        } else {
            messageCout += 1;
        }
    }
};