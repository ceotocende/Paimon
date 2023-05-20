const fs = require("fs");

async function loadEvents(client) {
  const eventFolders = fs.readdirSync(`${__dirname}/../../events`);
  for (const folder of eventFolders) {
    const events = fs.readdirSync(`${__dirname}/../../events/${folder}`);
    switch (folder) {
      case "discord":
        for (const fol of events) {
          const discordEvents = fs
            .readdirSync(`${__dirname}/../../events/${folder}/${fol}`)
            .filter((file) => file.endsWith(".js"));
          for (const file of discordEvents) {
            const event = require(`../../events/${folder}/${fol}/${file}`);
            if (event.name && typeof event.execute == "function") {
              if (event.once)
                client.once(event.name, (...args) =>
                  event.execute(...args, client)
                );
              else
                client.on(event.name, (...args) =>
                  event.execute(...args, client)
                );
            } else console.error()
          }
        }
        break;
      default:
        break;
    }
  }
  return console.log("События загружены");
}
module.exports = { loadEvents };
