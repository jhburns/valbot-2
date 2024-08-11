import type { ChatInputCommandInteraction, Client } from 'discord.js';

export interface Action {
    (interaction: ChatInputCommandInteraction, client: Client): Promise<void>;
}

export interface CommandInfo {
    name: string,
    description: string,
    action: Action
}

