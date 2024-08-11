import type { CommandInfo, Action } from "src/command/CommandTypes";

const name = 'ping';
const description = 'test val-bot\'s performance';
const action: Action = async (interaction) => {
    await interaction.reply('Pong!');
}

const ping: CommandInfo = {
    name,
    description,
    action
};

export default ping;