require('source-map-support').install();
const bot = require('./dist/bot.js');

// This shim exists so sparked host can start the application from a root index file
bot.init();