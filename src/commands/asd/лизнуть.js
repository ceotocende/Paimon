const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const embedErr = require('../../module/EmbedErr.js');
const color = require('../../module/color.js');
const { lick } = require('../../module/gif.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('лизнуть')
        .setDescription('лизнуть')
        .addUserOption(option => option
            .setName('юзер')
            .setDescription('выберите пользователя')
            .setRequired(true)),
    async execute(interaction) {
        const gif = lick[Math.floor(Math.random() * lick.length)];
        const user = interaction.user;
        const target = interaction.options.getUser('юзер');
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Команда: лизнуть' })
            .setDescription(`${user}, лизнул(а) ${target}`)
            .setImage(gif)
            .setColor(color)
            .setFooter({ iconURL: `${user.displayAvatarURL()}`, text: `${user.username}` });
        if (target.bot === false && user.id != target.id) {
            interaction.reply({
                embeds: [embed]
            });
        } else if (target.bot === true || user.id === target.id) {
            interaction.reply({
                embeds: [embedErr]
            });
        }
    }
}