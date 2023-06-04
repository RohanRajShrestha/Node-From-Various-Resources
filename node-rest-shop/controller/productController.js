const Product = require('../models/productModels');
const {getPostData} = require('../utils');

const getAllProducts = async (req, res) => {
     try {
        const products = await Product.fetchAll();
        
        res.writeHead(200, {'Content_type' : 'application/json'});
        console.log(products);
        res.write(JSON.stringify(products));
        res.end();
     } catch (error) {
        console.log(error);
     }
}

const getProduct = async (req, res, id) => {
    try {
        const productsById = await Product.findById(id);
        console.log('productsById', productsById);
        console.log();
        if (productsById === undefined) {
            res.writeHead(200, {'Content_type' : 'application/json'});
            res.write(JSON.stringify("{'message' : 'Not Found'}"));
            res.end();
        } else {
            res.writeHead(200, {'Content_type' : 'application/json'});
            res.write(JSON.stringify(productsById));
            res.end();
        }
        
    } catch (error) {
        console.log(error);
    }
}

async function createProduct(req, res) {
    try {
        req.on('error', (err) => {
            console.error(err);
            res.statusCode = 400;
            res.end();
          });
        res.on('error', (err) => {
        console.error(err);
        });

        try {
            const body = await getPostData(req);
            const {title, description, price} = JSON.parse(body);
            const product= {
                title : title, // can just be written title
                description,
                price
            }
            const newProduct = await Product.create(product);
            // body = Buffer.concat(body).toString();
            res.writeHead(201, {'Content-Type' : 'application/json'});
            res.write(JSON.stringify(product));
            res.end();
        } catch (error) {
            
        }
        // const product= {
        //     title : 'Test Product',
        //     description : 'This is my Product',
        //     price : 100
        // }
        const { headers, method, url } = req;
        console.log(headers, method, url);
        // let body = '';
        // // can be done in other way
        // req.on('data', (chunk) => {
        //     body += chunk.toString();
        // })

        // req.on('end', async () => {
        //     console.log('Parsge Body', JSON.parse(body));
        //     const {title, description, price} = JSON.parse(body);
        //     console.log(title);
        //     const product= {
        //         title : title, // can just be written title
        //         description,
        //         price
        //     }
        //     const newProduct = await Product.create(product);
        //     res.writeHead(201, {'Content-Type' : 'application/json'});
        //     res.write(JSON.stringify(newProduct));
        //     res.end();
        // });
        
        // other way
        // let body = '';
        // req.on('error', (err) => {
        //     console.error(err.stack);
        // }).on('data', (chunk) => {
        //     body += chunk.toString();
        // }).on('end', async () => {
        //     res.on('error', (err) => {
        //         console.error(err);
        //     });
        //     console.log(body);
        //     const {title, description, price} = JSON.parse(body);
        //     const product= {
        //         title : title, // can just be written title
        //         description,
        //         price
        //     }
        //     const newProduct = await Product.create(product);
        //     // body = Buffer.concat(body).toString();
        //     res.writeHead(201, {'Content-Type' : 'application/json'});
        //     res.write(JSON.stringify(product));
        //     res.end();
        // })
    } catch (error) {
        
    }
}

const updateProduct = async (req, res, id) => {
    const product = await Product.findById(id);
    if (!product) {
        res.writeHead(404, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({message : 'Product Not Found'}));
    } else {
        const body = await getPostData(req);
        const {title, description, price} = JSON.parse(body);

        const productData = {
            title : title || product.title,
            description : description || product.description,
            price : price || product.price
        }
        const updatedProduct = await Product.update(id, productData);
        res.writeHead(200, {'Content_type' : 'application/json'});
        res.write(JSON.stringify(updatedProduct));
        res.end();
    }
}

const deleteProduct = async (req, res, id) => {
    const product = await Product.findById(id);
    if (!product) {
        res.writeHead(404, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({message : 'Product Not Found'}));
    } else {
        const removedProduct = await Product.remove(id);
        res.writeHead(200, {'Content_type' : 'application/json'});
        res.write(JSON.stringify(removedProduct));
        res.end();
    }
}
module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}