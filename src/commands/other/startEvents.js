const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const cron = require('node-cron');
const { Sequelize } = require('sequelize');
const sequelize = require('../../database/dbsync.js');
const usersMessages = require('../../database/model/messagesUsers.js')(sequelize, Sequelize.DataTypes);

let eventsCounter = 0;
let eventStart = 0;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start_event')
        .setDescription('start all event'),
    async execute(interaction, client) {
        const channel = client.channels.cache.get('980774671584731157');
        const channelTestBot = client.channels.cache.get('990715132021719080');
        interaction.reply(`true ${eventsCounter}`)

        const button = new ButtonBuilder()
            .setCustomId('buttonForStopEventsAll')
            .setLabel('stop all events')
            .setDisabled(false)
            .setStyle(ButtonStyle.Danger)

        const row = new ActionRowBuilder().addComponents(button)


        const c = cron.schedule('* * * * *', async () => {

            eventsCounter += 1;
            // const message = await channel.send({
            //     embeds: [
            //         new EmbedBuilder()
            //             .setAuthor({ name: 'Кол-во сообщений' })
            //             .setDescription(`Больше всего сообщений у <@${recordWithMaxNumber.user_id}> кол-во сообщений ${recordWithMaxNumber.user_message}`)
            //             .setTimestamp()
            //     ],
            //     components: [row]
            // })
            // const collector = message.createMessageComponentCollector();

            // collector.on('collect', (interaction) => {
            //     const idCollector = interaction.customId;
            //     if (idCollector === 'buttonForStopEventsAll') {
            //         c.stop();
            //         interaction.reply({
            //             content: 'Ивенты отключены',
            //             ephemeral: true
            //         })
            //     }
            // })
        });
        c;
        if (eventStart === 0) {
            eventStart += 1;
            const updateJob = cron.schedule('0 16 * * 0', async () => {
                usersMessages.sync();
                const maxNumber = await usersMessages.max('user_message');
                const recordWithMaxNumber = await usersMessages.findOne({ where: { user_message: maxNumber } });
                channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({ name: 'Кол-во сообщений' })
                            .setDescription(`
                        Больше всего сообщений у <@${recordWithMaxNumber.user_id}> 
                        кол-во сообщений ${recordWithMaxNumber.user_message}
                        `)
                            .setTimestamp()
                    ],
                })
            });
            updateJob;
        } else {
            channelTestBot.send({
                content: `Системное сообщение: ивент "Подсчет сообщений уже запущен"`
            })
        }
    }
}