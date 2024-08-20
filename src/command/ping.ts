import type { CommandInfo, Execute } from "src/command/CommandTypes";
import { SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('checks bot health');

const execute: Execute = async (interaction, client) => {
    const start = Date.now();

    const message = await interaction.reply({
        content: 'Pong!', ephemeral: true
    });

    const end = Date.now();

    await message.edit(
        "🏓, this message took a " +
        `roundtrip 🔄 of ${Math.floor(end - start)}ms, ` +
        `and has a heartbeat 💓 of ${client.ws.ping}ms.`
    )
}

const ping: CommandInfo = {
    data,
    execute,
    tag: 'Utility'
};

export default ping;