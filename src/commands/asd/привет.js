const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const embedErr = require('../../utils/EmbedErr');
const { color_stable } = require('../../utils/colors.js');
const color = color_stable;
const { hi } = require('../../utils/gif.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('привет')
        .setDescription('привет')
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
        const gif = hi[Math.floor(Math.random() * hi.length)];
        const user = interaction.user;
        const target = interaction.options.getUser('юзер');
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Команда: привет' })
            .setDescription(`
            ${user}, приветствует ${target}
            
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