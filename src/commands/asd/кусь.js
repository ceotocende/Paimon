const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const embedErr = require('../../utils/EmbedErr');
const { color_stable } = require('../../utils/colors.js');
const color = color_stable;
const { kus } = require('../../utils/gif.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('кусь')
        .setDescription('укусить')
        .addUserOption(option => option
            .setName('юзер')
            .setDescription('выберите пользователя')
            .setRequired(true))
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
        const gif = kus[Math.floor(Math.random() * kus.length)];
        const user = interaction.user;
        const target = interaction.options.getUser('юзер');
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Команда: кусь' })
            .setDescription(`
            ${user}, куснул(а) ${target}
            
            ${textContent}`)
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