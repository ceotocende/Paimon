const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const embedErr = require('../../utils/EmbedErr');
const { color_stable } = require('../../utils/colors.js');
const color = color_stable;
const { angry } = require('../../utils/gif.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('злиться')
        .setDescription('злюсь')
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
        const gif = angry[Math.floor(Math.random() * angry.length)];
        const user = interaction.user;
        const target = interaction.options.getUser('юзер');
        const random = Math.floor(Math.random() * 5) + 1;
        let text = '';
        switch (random) {
            case 1:
                text = `${user} злится на ${target}

                ${textContent}`
                break;
            case 2:
                text = `${user} возмущен поведением ${target}.

                ${textContent}`
                break;
            case 3:
                text = `${user} недоволен ${target}

                ${textContent}`
                break;
            case 4:
                text = `${user} испытывает раздражение по отношению к  ${target}

                ${textContent}`
                break;
            case 5:
                text = `${user} злится на своего напарника ${target}.

                ${textContent}`
                break;
            default:
                break;
        }
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Команда: злиться' })
            .setDescription(text)
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