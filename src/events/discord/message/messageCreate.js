// const addBalance = require("../../../database/functions/addBalance");
const { emojis_guilds } = require('../../../utils/emoji.json')
let messageCout = 0;
let lastUsedTime = 0;
const cooldown = 600000;

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
        // addBalance(message.author.id, 1);
        const randomEmoji = emojis_guilds[Math.floor(Math.random() * emojis_guilds.length)];
        if (messageCout === 20) {
            messageCout = 0;
            message.react(randomEmoji)
        } else {
            messageCout += 1;
        }
        const dobroe = "доброе утро" || "утречко" || "доброе" || "утро" || "доброго дня" || "спокойной ночи" || "доброй ночи" || "сладких снов";
        if (message.content.toLowerCase().includes(dobroe)) {
            message.react("1115491496314011849")
        }

        if (message.content.toLowerCase() === "эхе") {
            const currentTime = Date.now();
            if (currentTime - lastUsedTime > cooldown) {
              message.reply("Эхе!? Те нан да ё!!");
              lastUsedTime = currentTime;
            }
        }
    }
};