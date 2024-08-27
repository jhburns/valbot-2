import type { CommandInfo, Execute } from "src/command/CommandTypes";
import { SlashCommandBuilder } from "discord.js";
import R from 'rambda';

const charMap: Record<string, string> = {
    'a': ':regional_indicator_a:', 'b': '🅱️', 'c': ':regional_indicator_c:', 'd': ':regional_indicator_d:', 'e': ':regional_indicator_e:',
    'f': ':regional_indicator_f:', 'g': ':regional_indicator_g:', 'h': ':regional_indicator_h:', 'i': ':regional_indicator_i:', 'j': ':regional_indicator_j:',
    'k': ':regional_indicator_k:', 'l': ':regional_indicator_l:', 'm': ':regional_indicator_m:', 'n': ':regional_indicator_n:', 'o': ':no_entry:',
    'p': '🅿️', 'q': ':regional_indicator_q:', 'r': ':regional_indicator_r:', 's': ':regional_indicator_s:', 't': ':regional_indicator_t:',
    'u': ':regional_indicator_u:', 'v': ':regional_indicator_v:', 'w': ':regional_indicator_w:', 'x': ':regional_indicator_x:', 'y': ':regional_indicator_y:',
    'z': ':regional_indicator_z:',

    '0': '0️⃣', '1': '1️⃣', '2': '2️⃣', '3': '3️⃣', '4': '4️⃣', '5': '5️⃣', '6': '6️⃣', '7': '7️⃣', '8': '8️⃣', '9': '9️⃣',

    '!': '‼️', '?': '⁉️', ' ': '⬜',
};

const parseCustomEmojis = (text: string): string[] => {
    const split = R.split('', R.trim(text));
    const emojiStrings: string[] = [];

    const concatLast = () => emojiStrings[emojiStrings.length - 1] += split.shift();

    while (split.length > 0) {
        if (split[0] === '<' && split.length >= 2 && split[1] === ':') {
            emojiStrings.push(split.shift()!);
            concatLast();

            while (split.length > 0 && split[0] as string !== '>') {
                concatLast();
            }

            if (split.length > 0) {
                concatLast();
            }
        } else {
            emojiStrings.push(split.shift()!);
        }
    }

    return emojiStrings;
}

const data = new SlashCommandBuilder()
    .setName('emojify')
    .setDescription('converts you text into emojis')
    .addStringOption((option) =>
        option.setName('content')
            .setDescription('text to convert, maximum 25 characters')
            .setRequired(true));

const execute: Execute = async (interaction) => {
    const content = interaction.options.getString('content')!;
    const emojis: string[] = R.pipe(
        parseCustomEmojis,
        R.map(R.toLower),
        R.map((c) => charMap[c] ?? c),
    )(content);

    if (emojis.length > 25) {
        await interaction.reply('Sorry, please provide text less than 25 characters long.');
        return;
    }

    await interaction.reply(R.replace(/^ +/gm, '', R.join('', emojis)));
}

const emojify: CommandInfo = {
    data,
    execute,
    tag: 'Entertainment'
};

export default emojify;