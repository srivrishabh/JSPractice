const {createServer} = require('net');
const server = createServer();

server.on('connection', (socket) => {
    console.log('connected')
});

server.listen('4000', () => {console.log('server listening...')});
