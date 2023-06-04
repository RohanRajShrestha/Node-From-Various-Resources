const fs = require('fs');
const http = require('http');
const path = require('path');
const fsPromises = require('fs').promises;


const {logEvents} = require('./logEvents');
const EventEmitter = require('events');

class Emitter extends EventEmitter {};

const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));
// defining the port number for the server to run on currently localhots/3500
const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response ) => {
    try {
        // image doesn't use utf-8 encodiing
        const rawData = await fsPromises.readFile(
            filePath, 
            !contentType.includes('image') ? 'utf-8' : '');

        const data = contentType === 'application/json'
            ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200, 
            {'Content-Type' : contentType});
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    } catch (err) {
        console.log(err);
        myEmitter.emit('log', `${err.name} : ${err.message} `, 'errorLog.txt');
        response.statusCode = 500;
        response.end();
    }
}

// creating a server to get request
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    myEmitter.emit('log', `${req.url} \t ${req.method} \n`, 'reqLog.txt');

    /*
    different version of redirecting route to do different things
     * return index.html, but this would require repeating code for each and every file
        if (req.url === '/' || req.url === 'index.html') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const pathName = path.join(__dirname, 'views', 'index.html');
            fs.readFile(pathName,'utf-8', (err, data) =>{
                res.end(data);
            });
        }
    */
    /**
     * Other Method
        switch (req.url) {
        case '/' :
            res.statusCode = 200;
            const pathName = path.join(__dirname, 'views', 'index.html');
            fs.readFile(pathName,'utf-8', (err, data) =>{
                res.end(data);
                console.log(res);
            });
        }
     */
    
    // what we wil use

    let contentType;
    const extension = path.extname(req.url); // getting extension of requested file but we won't be gettin ext everytime

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    // getting file path 
    /**
     * first when requesting an index.html with only /
     * but if content type is html and last value in url is / as home/, might be requesting sub dir
     * else if it is requesting any of the html page from base view folder
     * else it can be css img which are specified in url as url/css/style
    */
    let filePath = contentType === 'text/html' && req.url === '/'
        ? path.join(__dirname, 'views', 'index.html')
        : contentType === 'text/html' && req.url.slice(-1) === '/'
            ? path.join(__dirname, 'views', req.url, 'index.html')
            : contentType === 'text/html' 
                ? path.join(__dirname, 'views', req.url)
                : path.join(__dirname, req.url);

    // for url such as url/about without any .html ext
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';
    
    const fileExists = fs.existsSync(filePath);
    if (fileExists) {
        serveFile(filePath, contentType, res);
    } else {
        console.log(path.parse(filePath));
        switch(path.parse(filePath).base) {
            case 'old-page.html' : 
                res.writeHead(301, {'Location' : '/new-page.html'});
                res.end();
                break;
            case 'www-page.html' :
                res.writeHead(301, {'Location' : '/'});
                res.end();
                break;
            default:
                // serve 404 error
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
        /**
         * /old GET
                {
                root: 'C:\\',
                dir: 'C:\\Users\\acer\\Desktop\\Learning Node\\WebServer\\views',
                base: 'old-page.html',
                ext: '.html',
                name: 'old'
                }
        */
    }

})


// server needs to listen for request so we need this running on every serveer.js file
server.listen(PORT, () => console.log(`Server running on ${PORT}`));















// myEmitter.on('log', (msg) => logEvents(msg));

// setTimeout(() => {
//     myEmitter.emit('log', 'Log event emitter');
// }, 2000);

