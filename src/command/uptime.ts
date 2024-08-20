import type { CommandInfo, Execute } from "src/command/CommandTypes";
import { intervalToDuration, formatDuration } from 'date-fns/fp';
import R from 'rambda';
import { SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('gets how long the valbot has been gaming')

const execute: Execute = async (interaction) => {
    const formatted = R.pipe(
        (s) => s * 1000,
        (ms) => new Date(ms),
        (end) => intervalToDuration({ start: new Date(0), end }),
        formatDuration()
    )(process.uptime());

    await interaction.reply({
        content: 'I have been busy playing Fist Full of Frags for: ' +
            `**${formatted}** ᶠʳᵉᵉᵉ ᵐᵉᵉ`,
        ephemeral: true
    });
}

const uptime: CommandInfo = {
    data,
    execute,
    tag: 'Utility'
};

export default uptime;