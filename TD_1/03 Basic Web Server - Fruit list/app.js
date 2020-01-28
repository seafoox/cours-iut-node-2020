const http = require('http');
const fs = require('fs');

const fruits = ['Fraise', 'Orange', 'Melon'];

http.createServer((req, res) => {

    let html = fs.readFileSync(__dirname + '/fruits.html', 'utf8');

    let listHtml = '';
    fruits.forEach( (fruit) => {
      listHtml += `<li>${fruit}</li>`;
    });
    html = html.replace('#fruit_list#', listHtml);

    res.writeHead(200, { "Content-Type": "text/html"});
    res.write(html);
    res.end();

}).listen(3000, "127.0.0.1");
