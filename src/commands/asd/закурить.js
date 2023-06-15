const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { color_stable } = require('../../utils/colors.js');
const color = color_stable;
const { smoke } = require('../../utils/gif.json');


module.exports = {
    data: new SlashCommandBuilder() 
        .setName('закурить')
        .setDescription('просто раслабся')
        .addStringOption(option => option
            .setName('контент')
            .setDescription('введите контент сообщения')
            .setRequired(false)),
    async execute(interaction) {
        const content = interaction.options.getString('контент');
        let textContent = '';
        if (content) {
            textContent = ('> **' + content + '**');
        }
        const user = interaction.user;
        const gif = smoke[Math.floor(Math.random() * smoke.length)];
        const random = Math.floor(Math.random() * 5) + 1;
        let text = '';
        switch (random) {
            case 1:
                text = `${user} решил взять перерыв и снять стресс, закурив сигарету.

                ${textContent}` 
                break;
            case 2:
                text = `Не смотря на то, что ${user} никогда не курит, на сей раз он решил сделать исключение и закурил.

                ${textContent}`
                break;
            case 3:
                text = `${user} чувствовал сильный стресс, поэтому он решил немного расслабиться, закурив сигарету.
                
                ${textContent}`
                break;
            case 4:
                text = `После долгого рабочего дня, ${user} ощутил необходимость взять небольшой перерыв.

                ${textContent}`
                break;
            case 5:
                text = `${user} понимал, что курение - это плохая привычка, но он так устал от всего, что все же решил закурить.

                ${textContent}`
                break;
            default:
                break;
        }

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Команда: закурить' })
            .setDescription(text)
            .setColor(color)
            .setImage(gif)
            .setTimestamp()
            .setFooter({ iconURL: `${user.displayAvatarURL()}`, text: `${user.username}` });

        interaction.reply({
            embeds: [embed],
        });
    }
}