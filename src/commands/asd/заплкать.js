const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { cry } = require('../../utils/gif.json');
const embedErr = require('../../utils/EmbedErr');
const { color_stable } = require('../../utils/colors.js');
const color = color_stable;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('заплакать')
        .setDescription('просто поплачь')
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
        const gif = cry[Math.floor(Math.random() * cry.length)];
        const random = Math.floor(Math.random() * 5) + 1;
        let text = '';
        switch (random) {
            case 1:
                text = `${user}, очень сильно заплакал, не обижайте его больше(

                ${textContent}`
                break;
            case 2:
                text = `${user} был так растроган, что не мог удержать слезы.

                ${textContent}`
                break;
            case 3:
                text = `${user} был очень потрясен и не мог сдержать эмоции, поэтому начал плакать.

                ${textContent}`
                break;
            case 4:
                text = `${user} знает, что плакать - это нормально и помогает избавиться от боли и страдания.

                ${textContent}`
                break;
            case 5:
                text = `Когда ${user} испытал эмоциональную боль, он позволил себе плакать, чтобы чувствовать себя лучше.
                
                ${textContent}`
                break;
            default:
                break;
        }
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Команда: заплакать' })
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