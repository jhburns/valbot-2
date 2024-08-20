import type { ChatInputCommandInteraction, Client, SlashCommandBuilder } from 'discord.js';

export interface Execute {
    (interaction: ChatInputCommandInteraction, client: Client, commands: CommandInfo[]): Promise<void>;
}

export type GroupTag = 'Utility' | 'Entertainment';

export interface CommandInfo {
    data: SlashCommandBuilder,
    execute: Execute,
    tag: GroupTag,
}

