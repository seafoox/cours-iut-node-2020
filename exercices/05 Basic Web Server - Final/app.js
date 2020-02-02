const http = require('http');
const fs = require('fs');

const fruits = ['Fraise', 'Orange', 'Melon'];
const person = {
    firstname: "Chuck",
    lastname: "Norris"
};

http.createServer((req, res) => {
    if (req.url === '/fruits') {
        let html = fs.readFileSync(__dirname + '/fruits.html', 'utf8');
        html = html.replace('#fruit_list#', getItemList(fruits));
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
    }
    else if (req.url === '/json') {
        res.writeHead(200, { "Content-Type": "application/json"});
        res.write(JSON.stringify(person));
        res.end();
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<b>Page not found</b>');
        res.end();
    }
}).listen(3000, "127.0.0.1");


// Return elements as a list of <li></li>
function getItemList(list) {
    let listHtml = '';
    fruits.forEach( (fruit) => {
      listHtml += `<li>${fruit}</li>`;
    });
    return listHtml;
}