const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Bot ready event
client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}!`);
});

// Example message handler
client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    // Respond to "!ping"
    if (message.content === '!ping') {
        message.channel.send('Pong!');
    }
});

// Login using the token from config.json
client.login(config.DISCORD_TOKEN);
