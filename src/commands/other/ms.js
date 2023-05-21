const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('пинг')
        .setDescription('chek ping'),
    async execute(interaction, client) {
        interaction.reply({
            content: `${client.ws.ping}`,
            ephemeral: true
        })
    }
}