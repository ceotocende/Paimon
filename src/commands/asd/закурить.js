const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const color = require('../../module/color.js');
const { smoke }  = require('../../module/gif.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('закурить')
        .setDescription('просто раслабся'),
        async execute(interaction) {
            const user = interaction.user;
            const gif = smoke[Math.floor(Math.random() * smoke.length)];

            const embed = new EmbedBuilder()
            .setAuthor({ name: 'Команда: закурить' })
            .setDescription(`${user}, просто устал от всего и решил закурить.`)
            .setColor(color)
            .setImage(gif)
            .setFooter({ iconURL: `${user.displayAvatarURL()}`, text: `${user.username}` });

            interaction.reply({
                embeds: [embed],
            });
        }
}