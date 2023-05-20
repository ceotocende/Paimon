async function loadCommands(client) {
    const fs = require("fs");
  
    // if (client.commands) {
    //     await client.commands.clear();
    // } else {
    //     client.commands = new Map();
    // }
  
    client.commandsArray = [];
  
    const commandFolders = fs.readdirSync("./src/commands");
  
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        await client.commands.set(command.data.name, command);
  
        // //added checking if toJSON is a function so commands that are already supplied within JSON format can also be used
        if (typeof command.data.toJSON == "function")
          client.commandsArray.push(command.data.toJSON());
        else 
        client.commandsArray.push(command.data);
      }
    }
    await client.application.commands.set(client.commandsArray);
    return console.log("Загружены команды");
  }
  module.exports = { loadCommands };