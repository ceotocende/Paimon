const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const embedErr = require('../../utils/EmbedErr');
const { color_stable } = require('../../utils/colors.js');
const color = color_stable;
const { kulachek } = require('../../utils/gif.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('кулачек')
        .setDescription('дать кулак')
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
        const gif = kulachek[Math.floor(Math.random() * kulachek.length)];
        const user = interaction.user;
        const target = interaction.options.getUser('юзер');
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Команда: кулачек' })
            .setDescription(`
            ${user}, дал кулачек ${target}
            
            ${textContent}`)
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