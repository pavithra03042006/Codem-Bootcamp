const EventEmitter = require('events')

const event = new EventEmitter()

let count = 0

event.on('orderPlaced', () => {
    count++
    console.log("Order placed successfully")
    console.log("Total Orders: " + count)
})

for (let i = 0; i < 5; i++) {
    event.emit('orderPlaced')
}