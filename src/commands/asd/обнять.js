const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const embedErr = require('../../utils/EmbedErr');
const { color_stable } = require('../../utils/colors.js');
const color = color_stable;
const { cuddle } = require('../../utils/gif.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('обнять')
        .setDescription('обнимашки')
        .addUserOption(option => option
            .setName('юзер')
            .setDescription('выберите пользователя')
            .setRequired(true)),
    async execute(interaction) {
        const gif = cuddle[Math.floor(Math.random() * cuddle.length)];
        const user = interaction.user;
        const target = interaction.options.getUser('юзер');
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Команда: обнять' })
            .setDescription(`${user}, обнял(а) ${target}`)
            .setImage(gif)
            .setColor(color)
            .setTimestamp()
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