import type { ChatInputCommandInteraction, Client } from 'discord.js';

export interface Action {
    (interaction: ChatInputCommandInteraction, client: Client, commands: CommandInfo[]): Promise<void>;
}

export type GroupTag = 'Utility';

export interface CommandInfo {
    name: string,
    description: string,
    tag: GroupTag,
    action: Action
}

