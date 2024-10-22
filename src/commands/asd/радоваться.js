const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const embedErr = require('../../utils/EmbedErr');
const { color_stable } = require('../../utils/colors.js');
const color = color_stable;
const { joy } = require('../../utils/gif.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('радоваться')
        .setDescription('радоваться')
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
        const gif = joy[Math.floor(Math.random() * joy.length)];

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Команда: радоваться' })
            .setDescription(`
            ${user} радуется
            
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