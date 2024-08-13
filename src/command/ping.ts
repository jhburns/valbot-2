import type { CommandInfo, Action } from "src/command/CommandTypes";

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
    name: 'ping',
    description: 'description',
    action,
    tag: 'Utility'
};

export default ping;