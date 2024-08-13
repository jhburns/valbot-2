import { EmbedBuilder } from "discord.js";
import type { CommandInfo, Action } from "src/command/CommandTypes";
import R from 'rambda';

const action: Action = async (interaction, client, commands) => {
    const fields = R.pipe(
        R.groupBy((c: CommandInfo) => c.tag),
        Object.entries,
        R.map(([name, items]) => ({
            name,
            value: R.pipe(
                R.map((c: CommandInfo) => c.name),
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
    name: 'help',
    description: 'lists all commands',
    action,
    tag: 'Utility'
};

export default help;