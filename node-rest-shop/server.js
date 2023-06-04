const http = require('http');
// const {app} = require('./app.js')
const products = require('./data/products.json');
const {getAllProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('./controller/productController');
const port = process.env.PORT || 3500;

// for this we need listener to get and reuests
const server = http.createServer((req, res) => {
    // console.log(req);
    if (req.url === '/' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html')
        res.write('<h1>This is home page</h1>')
        res.end();
    } else if (req.url === '/api' && req.method === 'GET') {
        res.writeHead(200, {'Content_type' : 'application/json'});
        res.write("hellow From Api");
        res.end();
    } else if (req.url === '/products' && req.method === 'GET') {
        console.log('here');
        getAllProducts(req, res);
    } else if (req.url.match(/api\/products\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        console.log('---------------------------');
        console.log('id', id);
        console.log('---------------------------');
        getProduct(req, res, id);
    } else if (req.url.match(/api\/products\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        console.log('---------------------------');
        console.log('id', id);
        console.log('---------------------------');
        updateProduct(req, res, id);
    } else if (req.url.match(/api\/products\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        console.log('---------------------------');
        console.log('id', id);
        console.log('---------------------------');
        deleteProduct(req, res, id);
    }else if (req.url === '/api/product' && req.method === 'POST') {
        console.log('hello');
        createProduct(req, res)
    } else {
        res.writeHead(404, {'Content_type' : 'application/json'});
        res.write('Route Not Found');
        res.end();
    }
}); 

server.listen(port, () => console.log(`Server running on localhost:${port}`));