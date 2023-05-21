const { EmbedBuilder } = require('discord.js');

const embedErr = new EmbedBuilder()
    .setTitle('Ошибка')
    .setDescription(`
    Произошла ошибка при выполнении команды.
    Вы упомянули себя, зачем вам это?`
    )
    .setImage('https://media.tenor.com/qkPV6_DL-NAAAAAd/bocchi-the-rock-bocchi.gif')
    .setColor('DarkRed');

module.exports = embedErr;