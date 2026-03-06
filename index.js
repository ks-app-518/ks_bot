// index.js   —   Everything in one file (token hardcoded)

const { Client, GatewayIntentBits } = require('discord.js');

// ────────────────────────────────────────────────
//    ↓↓↓  PASTE YOUR REAL TOKEN HERE  ↓↓↓
//    NEVER share this file after you add the real token
// ────────────────────────────────────────────────
const TOKEN = 'MTQ3OTQ0NTg2MzAzMjk0NjgwMA.GPO9W_.Vv9ZfSoJg3p1Z6fyhCz64508HSjYhQtlyVhxr0';

// Optional: you can also hardcode client ID & guild ID if needed later
const CLIENT_ID = '1315669854338154590';     // your Application ID (not secret)
const TEST_GUILD_ID = '1479445863032946800'; // your server ID (not secret)

// ────────────────────────────────────────────────
//   Create the bot client
// ────────────────────────────────────────────────
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,           // minimum needed for slash commands
  ],
});

// ────────────────────────────────────────────────
//   Bot ready event
// ────────────────────────────────────────────────
client.once('ready', () => {
  console.log('╔════════════════════════════════════════════╗');
  console.log(`║  Logged in as → ${client.user.tag}  ║`);
  console.log(`║  In ${client.guilds.cache.size} server(s)           ║`);
  console.log('╚════════════════════════════════════════════╝');
  console.log('Bot is online! Try /ping or /hello');
});

// ────────────────────────────────────────────────
//   Slash command handler
// ────────────────────────────────────────────────
client.on('interactionCreate', async (interaction) => {
  // Only handle slash commands
  if (!interaction.isChatInputCommand()) return;

  try {
    if (interaction.commandName === 'ping') {
      await interaction.reply('🏓 **Pong!**');
    }

    else if (interaction.commandName === 'hello') {
      await interaction.reply(`👋 Hello **${interaction.user.username}**!`);
    }

    // You can add more commands right here, example:
    // else if (interaction.commandName === 'info') {
    //   await interaction.reply(`Server: **\( {interaction.guild.name}**\nYou: ** \){interaction.user.tag}**`);
    // }

  } catch (err) {
    console.error('Error in command:', err);
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({ content: 'Sorry, something broke 😔', ephemeral: true })
        .catch(() => {}); // silent catch
    }
  }
});

// ────────────────────────────────────────────────
//   Start the bot
// ────────────────────────────────────────────────
client.login(TOKEN)
  .then(() => {
    console.log('Login successful');
  })
  .catch((err) => {
    console.error('Login FAILED — most likely wrong token');
    console.error(err.message);
    if (err.message.includes('401')) {
      console.log('→ Token is invalid or has been reset');
    }
  });

// Basic crash protection
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled error:', reason);
});
