const addBalance = require("../../../database/functions/addBalance");

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
    }
};