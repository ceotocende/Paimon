const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const embedErr = require('../../utils/EmbedErr');
const { color_stable } = require('../../utils/colors.js');
const color = color_stable;
const { suicide } = require('../../utils/gif.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('суецид')
        .setDescription('суицид')
        .addStringOption(option => option
            .setName('контент')
            .setDescription('введите контент сообщения')
            .setRequired(false)),
    async execute(interaction) {
        const content = interaction.options.getString('контент');
        let textContent = '';
        if (content) {
            textContent = ('> **' + content + '**');;
        }
        const user = interaction.user;
        const gif = suicide[Math.floor(Math.random() * suicide.length)];

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Команда: суицид' })
            .setDescription(`
            ${user}, не стал принимать мир таким какой он есть и решил покончить жизнь самоубийством
            
            ${textContent}`)
            .setColor(color)
            .setTimestamp()
            .setImage(gif)
            .setFooter({ iconURL: `${user.displayAvatarURL()}`, text: `${user.username}` });

        interaction.reply({
            embeds: [embed],
        });
    }
}