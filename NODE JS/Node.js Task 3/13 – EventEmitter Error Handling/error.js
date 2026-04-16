const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('error', (err) => {
    console.log("Error:", err.message);
});

emitter.on('processData', (data) => {
    console.log("Processing:", data);

    if (!data) {
        emitter.emit('error', new Error("Invalid data received"));
    } else {
        console.log("Data processed successfully");
    }
});

emitter.emit('processData', "valid data");
emitter.emit('processData', null);