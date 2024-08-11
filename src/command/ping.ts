import type { CommandInfo, Action } from "src/command/CommandTypes";

const name = 'ping';
const description = 'test valbot\'s performance';
const action: Action = async (interaction, client) => {
    const start = Date.now();

    const message = await interaction.reply('Pong!');
    const end = Date.now();

    await message.edit(
        "🏓, this message took a " +
        `roundtrip 🔄 of ${Math.floor(end - start)}ms, ` +
        `and has a heartbeat 💓 of ${client.ws.ping}ms.`
    )
}

const ping: CommandInfo = {
    name,
    description,
    action
};

export default ping;