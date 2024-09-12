import { ShewenyClient } from "sheweny";
import axios from "axios";
import { Partials, ActivityType } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

class Client extends ShewenyClient {
  constructor() {
    super({
      intents: [ "Guilds" ],
      partials: [Partials.GuildMember],
      mode: "development",
      joinThreadsOnCreate: true,
      presence: {
        status: "online",
        activities: [{ 
            name: '🐸 🔄', 
            type: ActivityType.Custom,
        }], 
      },
      managers: {
        commands: {
          directory: "./commands",
          prefix: "!",
          applicationPermissions: true,
          default: {
            userPermissions: ["UseApplicationCommands"],
          }
        },
        events: {
          directory: "./events",
        },
//        buttons: {
//          directory: "./interactions/buttons",
//        },
//        selectMenus: {
//          directory: "./interactions/selectMenus",
//        },
      },
    });

    this.login(process.env.DISCORD_TOKEN);
  }
}

new Client();