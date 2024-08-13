import type { CommandInfo, Action } from "src/command/CommandTypes";
import { intervalToDuration, formatDuration } from 'date-fns/fp';
import R from 'rambda';

const action: Action = async (interaction) => {
    const formatted = R.pipe(
        (s) => s * 1000,
        (ms) => new Date(ms),
        (end) => intervalToDuration({ start: new Date(0), end }),
        formatDuration()
    )(process.uptime());

    await interaction.reply(
        'I have been busy playing Fist Full of Frags for: ' +
        `**${formatted}** ᶠʳᵉᵉᵉ ᵐᵉᵉ`);
}

const uptime: CommandInfo = {
    name: 'uptime',
    description: 'gets how long the valbot has been gaming',
    action,
    tag: 'Utility'
};

export default uptime;