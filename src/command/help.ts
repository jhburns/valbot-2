import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { CommandInfo, Execute } from "src/command/CommandTypes";
import R from 'rambda';

const data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('lists all commands');

const execute: Execute = async (interaction, client, commands) => {
    const fields = R.pipe(
        R.groupBy((c: CommandInfo) => c.tag),
        Object.entries,
        R.map(([name, items]) => ({
            name,
            value: R.pipe(
                R.map((c: CommandInfo) => c.data.name),
                R.sort((a, b) => a.localeCompare(b)),
                R.map((n: string) => `\`/${n}\``),
                R.join(' ')
            )(items)
        })),
        R.sortBy(R.prop('name'))
    )(commands)


    const embed = new EmbedBuilder()
        .setColor(0x26D07C)
        .setTitle('Commands')
        .addFields(
            fields
        );

    await interaction.reply({ embeds: [embed] });
};

const help: CommandInfo = {
    data,
    execute,
    tag: 'Utility'
};

export default help;