const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { cry } = require('../../module/gif.json');
const color = require('../../module/color.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('заплакать')
        .setDescription('просто поплачь'),
        async execute(interaction) {
            const user = interaction.user;
            const gif = cry[Math.floor(Math.random() * cry.length)];

            const embed = new EmbedBuilder()
            .setAuthor({ name: 'Команда: заплакать' })
            .setDescription(`${user}, очень сильно расстроился, не обижайте его больше(.`)
            .setColor(color)
            .setImage(gif)
            .setFooter({ iconURL: `${user.displayAvatarURL()}`, text: `${user.username}` });

            interaction.reply({
                embeds: [embed],
            });
        }
}