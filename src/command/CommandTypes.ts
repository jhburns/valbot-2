import type { ChatInputCommandInteraction } from 'discord.js';

export interface Action {
    (interaction: ChatInputCommandInteraction): Promise<void>;
}

export interface CommandInfo {
    name: string,
    description: string,
    action: Action
}

