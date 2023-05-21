const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const cron = require('node-cron');
const { Sequelize } = require('sequelize');
const sequelize = require('../../database/dbsync.js');
const usersMessages = require('../../database/model/messagesUsers.js')(sequelize, Sequelize.DataTypes);

let eventsCounter = 0;
let eventStart = 0;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start_event_paimon')
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
            usersMessages.sync();
            const maxNumber = await usersMessages.max('users_message_timely');
            const recordWithMaxNumber = await usersMessages.findOne({ where: { users_message_timely: maxNumber } });
            console.log(maxNumber, recordWithMaxNumber)
            channelTestBot.send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: 'Кол-во сообщений' })
                        .setDescription(`
                        Недельный ивент подсчет сообщений! 
                        Больше всего сообщений у <@${recordWithMaxNumber.user_id}> 
                        кол-во сообщений ${recordWithMaxNumber.users_message_timely}
                    `)
                        .setTimestamp()
                ],
            })
        });
        c;


        const updateJob = cron.schedule('* * * * *', async () => {
            usersMessages.sync();
            const maxNumber = await usersMessages.max('user_message');
            const recordWithMaxNumber = await usersMessages.findOne({ where: { users_message_timely: maxNumber } });
            channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: 'Кол-во сообщений' })
                        .setDescription(`
                        Недельный ивент подсчет сообщений! 
                        Больше всего сообщений у <@${recordWithMaxNumber.user_id}> 
                        кол-во сообщений ${recordWithMaxNumber.users_message_timely}
                    `)
                        .setTimestamp()
                ],
            })
        });
        updateJob;



        if (eventStart === 0) {
            eventStart += 1;
         
        } else {
            channelTestBot.send({
                content: `Системное сообщение: ивент "Подсчет сообщений уже запущен"`
            })
        }
    }
}