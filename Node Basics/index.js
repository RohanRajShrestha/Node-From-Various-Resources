const {logEvents} = require('./logEvents');

const EventEmitter = require('events');

class Myemitter extends EventEmitter {};

/**
 * Here, we are creating an event to log events after 2000 secnod timeout
*/
const myEmitter = new Myemitter();

myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
    myEmitter.emit('log', 'Log event emitter');
}, 2000);