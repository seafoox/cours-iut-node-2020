const http = require('http');

// ES5
//http.createServer(function (req, res) {
//})

// ES6
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<b>Hello world</b>');
    res.end();
}).listen(3000, '127.0.0.1');
