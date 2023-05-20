const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const color = require('../../module/color.js');
const { suicide }  = require('../../module/gif.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('суицид')
        .setDescription('суицид'),
        async execute(interaction) {
            const user = interaction.user;
            const gif = suicide[Math.floor(Math.random() * suicide.length)];

            const embed = new EmbedBuilder()
            .setAuthor({ name: 'Команда: суицид' })
            .setDescription(`${user}, не стал принимать мир таким какой он есть и решил покончить жизнь самоубийством`)
            .setColor(color)
            .setImage(gif)
            .setFooter({ iconURL: `${user.displayAvatarURL()}`, text: `${user.username}` });

            interaction.reply({
                embeds: [embed],
            });
        }
}