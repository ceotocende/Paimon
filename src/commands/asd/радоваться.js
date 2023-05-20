const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const color = require('../../module/color.js');
const { joy }  = require('../../module/gif.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('радоваться')
        .setDescription('радоваться'),
        async execute(interaction) {
            const user = interaction.user;
            const gif = joy[Math.floor(Math.random() * joy.length)];

            const embed = new EmbedBuilder()
            .setAuthor({ name: 'Команда: радоваться' })
            .setDescription(`${user}, радуется`)
            .setColor(color)
            .setImage(gif)
            .setFooter({ iconURL: `${user.displayAvatarURL()}`, text: `${user.username}` });

            interaction.reply({
                embeds: [embed],
            });
        }
}