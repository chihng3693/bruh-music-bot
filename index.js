const Discord = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] });

const token = 'ODg3MjA4MzcxNzU1ODMxMzI2.YUAzLw.ps5CyCYawkTz6oijR8JAWY7bU5Y';

const PREFIX = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Bot is online!');
})

client.on('message', message => {
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'play' || command === 'loop'){
        client.commands.get('play').execute(message, args, command, client, Discord);
    }

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }
})

client.login(token);