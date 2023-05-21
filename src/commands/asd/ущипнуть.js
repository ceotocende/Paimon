const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const embedErr = require('../../utils/EmbedErr');
const { color_stable } = require('../../utils/colors.js');
const color = color_stable;
const { pinch } = require('../../utils/gif.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ущипнуть')
        .setDescription('ущипнуть')
        .addUserOption(option => option
            .setName('юзер')
            .setDescription('выберите пользователя')
            .setRequired(true)),
    async execute(interaction) {
        const gif = pinch[Math.floor(Math.random() * pinch.length)];
        const user = interaction.user;
        const target = interaction.options.getUser('юзер');
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Команда: ущипнуть' })
            .setDescription(`${user}, ущипнул(а) ${target}`)
            .setImage(gif)
            .setTimestamp()
            .setColor(color)
            .setFooter({ iconURL: `${user.displayAvatarURL()}`, text: `${user.username}` });
        if (target.bot === false && user.id != target.id) {
            interaction.reply({
                content: `<@${target.id}>`,
                embeds: [embed]
              }).then((msg) => {
                setTimeout(() => {
                  interaction.editReply({
                     content: ` `,
                     embeds: [embed]
                  });
                }, 10)
              });
        } else if (target.bot === true || user.id === target.id) {
            interaction.reply({
                embeds: [embedErr]
            });
        }
    }
}