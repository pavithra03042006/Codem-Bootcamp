const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {

    if (req.url === '/readfile') {
        fs.readFile('data.txt', 'utf8', (err, data) => {
            if (err) {
                res.end('Error reading file')
                return
            }
            res.end(data)
        })
    }

    else if (req.url === '/streamfile') {
        const stream = fs.createReadStream('data.txt', 'utf8')
        stream.pipe(res)
    }

    else {
        res.end('Use /readfile or /streamfile')
    }

})

server.listen(3000)