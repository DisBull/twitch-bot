const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();


// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } 
  // Ignore messages from the bot
  
  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!d20') {
    const num = rollDice(commandName);
    client.say(target, `${context['display-name']} You rolled a ${num}.`);    
  } if (commandName === '!twitter') {
    client.say(target, `${context['display-name']} you can find it at twitter.com/z3ro0k`);
  } if (commandName === '!discord') {
    client.say(target, `${context['display-name']} Join my discord server here discord.gg/q99CQEP`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
  
  console.log(`* Executed ${commandName} command`);
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 20;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}