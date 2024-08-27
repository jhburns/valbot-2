import type { ChatInputCommandInteraction, Client, SharedNameAndDescription } from 'discord.js';

export interface Execute {
    (interaction: ChatInputCommandInteraction, client: Client, commands: CommandInfo[]): Promise<void>;
}

export type GroupTag = 'Utility' | 'Entertainment';

export interface CommandInfo {
    data: SharedNameAndDescription,
    execute: Execute,
    tag: GroupTag,
}

