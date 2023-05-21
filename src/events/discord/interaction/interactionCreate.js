const {
  ChatInputCommandInteraction,
  Client,
  InteractionType,
  EmbedBuilder,
} = require("discord.js");
const addBalance = require("../../../database/functions/addBalance");
let lastCommandTimes = {};

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const user = interaction.user;
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;
      const currentTime = Date.now();
      if (!lastCommandTimes[user.id]) {
        lastCommandTimes[user.id] = {};
      }

      if (lastCommandTimes[user.id][commandName] && currentTime - lastCommandTimes[user.id][commandName] < 5 * 60 * 1000) {
        const timeLeft = Math.ceil((lastCommandTimes[user.id][commandName] + 5 * 60 * 1000 - currentTime) / 1000);
        return interaction.reply({
          content: `Вы уже использовали эту команду, попробуйте через ${timeLeft} секунд`,
          ephemeral: true
        });
      } else {
        try {
          if (interaction.user.if === '515575447124181007') {

          } else {
            lastCommandTimes[user.id][commandName] = currentTime;
          } 
          await command.execute(interaction, client);
        } catch (error) {
          console.error(error);
          let pick = 0;
          let picks = ["reply", "editReply"];
          if (interaction.replied || interaction.deferred) pick = 1;
          await interaction[picks[pick]]({
            content: `Что-то странное случилось во время выполнения этой команды ...`,
            ephemeral: true,
          });
        }
      }
    }
    else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
    } else if (interaction.type == InteractionType.ModalSubmit) {
      const { modals } = client;
      const { customId } = interaction;
    }
  },
};
