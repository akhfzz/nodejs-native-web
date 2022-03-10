const http = require('http');
const requestBasic = require('./request1');
const requestURL = require('./request2');
const responseBody = require('./request3')

const server = http.createServer(responseBody);

const port = 5000;
const hostname = 'localhost'

server.listen(port, hostname, () => {
    console.log(`Anda berjalan pada port http://${hostname}/${port}`)
})

