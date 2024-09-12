import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';


export class HelpCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'help',
      description: 'Get started with timothy!',
      type: 'SLASH_COMMAND',
    });
  }

  async execute(interaction: ChatInputCommandInteraction) {
    const embed = new EmbedBuilder()
      .setColor('#F3F4F6')
      .setTitle('Help')
      .setDescription('timothy!!!!!!!')

    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setLabel('GitHub Sponsor')
          .setEmoji('<:redheart:1283587175790936074>')
          .setStyle(ButtonStyle.Link)
          .setURL('https://git.new/timothy')
      );

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  }
}
