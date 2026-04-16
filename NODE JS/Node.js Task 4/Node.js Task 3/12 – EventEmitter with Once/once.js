const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.once('serverStart', () => {
    console.log("Server started for the first time");
});

emitter.on('serverStart', () => {
    console.log("Server is running");
});

emitter.emit('serverStart');
emitter.emit('serverStart');
emitter.emit('serverStart');