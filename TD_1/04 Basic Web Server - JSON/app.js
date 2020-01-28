const http = require('http');
const fs = require('fs');
const person = {
    firstname: "Chuck",
    lastname: "Norris"
};

http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json"});
    res.write(JSON.stringify(person));
    res.end();
}).listen(3000, "127.0.0.1");
