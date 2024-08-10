import 'dotenv/config';
import { REST, Routes, Client, GatewayIntentBits } from 'discord.js';

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
];

const init = async () => {
    const token = process.env.TOKEN!;
    console.log(token)
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

    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === 'ping') {
            await interaction.reply('Pong!');
        }
    });

    client.login(token);
};

const bot = { init };
export default bot;