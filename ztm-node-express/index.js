const http = require('http');

console.log('this is the index page');
const server = http.createServer((req, res) => {
    console.log(req.headers);
    console.log(req.method);
    console.log(req.url);
    const user = {
        name : 'John',
        hobby : 'Skating'
    } 
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Type', 'text/html');
    res.end(JSON.stringify(user));
    res.end('<h1>Hello</h1>');
    console.log('Hi we are connected');
})

server.listen(3000);