const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('productAdded', (name) => {
    console.log("Product saved to database");
});

emitter.on('productAdded', (name) => {
    console.log("Email notification sent");
});

emitter.on('productAdded', (name) => {
    console.log("Inventory updated");
    console.log("Product Name:", name);
});

emitter.emit('productAdded', "Laptop");