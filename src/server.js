const http = require('http');
const pid = process.pid;
let users = 50;
http.createServer((req, res) => {
    res.write(`User count : ${req.method} ${req.originalUrl}`);
    res.end(`\nHandled by process ${pid}`);
}).listen(8080, ()=> {
    console.log('Started for process :: ' + pid);
});

process.on('message', (msg) => {
    users = msg;
});

