import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { CommandInteraction } from 'discord.js';
import { ApplicationCommandOptionType, GuildMember, PermissionResolvable } from "discord.js";


export class BanCommand extends Command {
    constructor(client: ShewenyClient) {
      super(client, {
        name: 'ban',
        description: 'Ban a member from the server.',
        type: 'SLASH_COMMAND',
        options: [
            {
                name: 'target',
                type: ApplicationCommandOptionType.User,
                required: true,
                description: 'The user to ban.',
            },
            {
                name: 'reason',
                type: ApplicationCommandOptionType.String,
                required: false,
                description: 'The reason of the ban.',
            },
        ],
        userPermissions: ["BanMembers"],
        clientPermissions: ["BanMembers"],
      });
    }
    
    async execute(interaction: CommandInteraction) {
        if (!interaction.guild) {
            return interaction.reply({ content: '<:x_:1283583715955445842> This command can only be used in a server.', ephemeral: true });
        }

        const userOption = interaction.options.get('target');
        const memberToBan = userOption ? await interaction.guild.members.fetch(userOption.value as string) as GuildMember : null;
        if (!memberToBan) {
            return interaction.reply({ content: '<:melting_face:1283575381491716186> User not found.', ephemeral: true });
        }
        const reason = interaction.options.get('reason')?.value as string || 'No reason provided.';
        
        const member = interaction.member as GuildMember;
        if (!member || !member.permissions.has('BAN_MEMBERS' as PermissionResolvable)) {
            return interaction.reply({ content: '<:x_:1283583715955445842> You do not have permission to ban members.', ephemeral: true });
        }

        try {
            await interaction.guild.members.ban(memberToBan.user, { reason });
            return interaction.reply({ content: `<:checkmark:1283569946617450623> **${memberToBan.user.tag}** has been banned.`, ephemeral: false });
        } catch (error) {
            return interaction.reply({ content: `<:melting_face:1283575381491716186> Failed to ban **${memberToBan.user.tag}**.`, ephemeral: true });
        }
    }
}