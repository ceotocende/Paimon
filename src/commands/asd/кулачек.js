const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const embedErr = require('../../module/EmbedErr.js');
const color = require('../../module/color.js');
const { kulachek } = require('../../module/gif.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('кулачек')
        .setDescription('дать кулак')
        .addUserOption(option => option
            .setName('юзер')
            .setDescription('выберите пользователя')
            .setRequired(true)),
    async execute(interaction) {
        const gif = kulachek[Math.floor(Math.random() * kulachek.length)];
        const user = interaction.user;
        const target = interaction.options.getUser('юзер');
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Команда: кулачек' })
            .setDescription(`${user}, дал кулачек ${target}`)
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