import 'dotenv/config';
import { REST, Routes, Client, GatewayIntentBits } from 'discord.js';
import R from 'rambda';

import type { CommandInfo } from './command/CommandTypes';
import ping from 'src/command/ping';
import uptime from 'src/command/uptime';
import help from 'src/command/help';

const commands = [
    ping,
    uptime,
    help
];

const commandPairs =
    R.map((c: CommandInfo) => [c.name, R.dissoc('name', c)] as [string, Omit<CommandInfo, 'name'>], commands);

const commandsByName = R.fromPairs(commandPairs);

const init = async () => {
    const token = process.env.TOKEN!;
    const applicationId = process.env.APPLICATION_ID!;

    const rest = new REST({ version: '10' }).setToken(token);

    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(applicationId), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }

    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.on('ready', () => {
        console.log(`Logged in as ${client.user!.tag}!`);
    });

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const commandName = interaction.commandName;
        if (R.has(commandName, commandsByName)) {
            await commandsByName[commandName].action(interaction, client, commands);
            return;
        }

        console.error(`Command not found '${commandName}'`)
    });

    client.login(token);
};

const bot = { init };
export default bot;