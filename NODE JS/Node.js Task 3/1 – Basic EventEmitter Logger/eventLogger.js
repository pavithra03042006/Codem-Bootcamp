const EventEmitter = require('events')

const emitter = new EventEmitter()

emitter.on('userLogin', (username, time) => {
    console.log('User Login Event Triggered')
    console.log('User: ' + username)
    console.log('Time: ' + time)
})

emitter.emit('userLogin', 'John', '10:30 AM')
emitter.emit('userLogin', 'Sara', '10:35 AM')