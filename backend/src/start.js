process.on('unhandledRejection', (e) => console.error('unhandledRejection', e));
process.on('uncaughtException', (e) => console.error('uncaughtException', e));

require('dotenv').config();
console.log('Starting app…');
require('./index.js');
