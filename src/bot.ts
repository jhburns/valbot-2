import 'dotenv/config';
import { REST, Routes, Client, GatewayIntentBits } from 'discord.js';
import R from 'rambda';
import pino from 'pino';

import type { CommandInfo, Execute } from './command/CommandTypes';
import ping from 'src/command/ping';
import uptime from 'src/command/uptime';
import help from 'src/command/help';
import emojify from 'src/command/emojify';

const commands: CommandInfo[] = [
    ping,
    uptime,
    help,
    emojify
];

const commandPairs =
    R.map((c: CommandInfo) => [c.data.name, c.execute] as [string, Execute], commands);

const commandsByName = R.fromPairs(commandPairs);

const init = async () => {
    const token = process.env.TOKEN!;
    const applicationId = process.env.APPLICATION_ID!;

    const logger = pino({
        transport: {
            target: 'pino-pretty'
        },
    })

    const rest = new REST({ version: '10' }).setToken(token);

    try {
        logger.info('🔄 Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(applicationId),
            { body: R.map(R.prop('data'), commands) });

        logger.info('✅ Successfully reloaded application (/) commands.');
    } catch (error) {
        logger.error(error);
    }

    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.on('ready', () => {
        logger.info(`😎 Logged in as *${client.user!.tag}*!`);
    });

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const commandName = interaction.commandName;
        if (!R.has(commandName, commandsByName)) {
            logger.info(`Command not found '${commandName}'`)
            return;
        }

        try {
            await commandsByName[commandName](interaction, client, commands);
        } catch (error) {
            logger.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'There was an error while executing this command! >_>', ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: 'There was an error while executing this command! >_>', ephemeral: true
                });
            }
        }
    });

    client.login(token);
};

const bot = { init };
export default bot;