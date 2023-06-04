const products = require('../data/products.json');
const {v4:uuid} = require('uuid');

const {writeToFile} = require('../utils')

function fetchAll(){
    return new Promise ((resolve, reject) => {
        resolve(products);
    })
}
const findById = async(id) =>  {
    return products.find((product) => product.id === id)
}

function create(product) {
    return new Promise ((resolve, reject) => {
        const newProduct = {id : uuid(), ...product};
        products.push(newProduct);
        writeToFile('./data/products.json', products)
        resolve(newProduct);
    })  
}

function update(id, product) {
    return new Promise ((resolve, reject) => {
        const findProductIndex = products.findIndex((p) => p.id === id);
        products[findProductIndex] = {id, ...product};
        writeToFile('./data/products.json', products);
        resolve(products[findProductIndex]);
    })
}

function remove(id) {
    return new Promise ((resolve, reject) => {
        const findProductIndex = products.findIndex((p) => p.id === id);
        const itemToBeDeleted = products[findProductIndex];
        products.splice(findProductIndex, 1); // only remove one specific index
        writeToFile('./data/products.json', products);
        resolve(itemToBeDeleted);
    })
}
module.exports = {
    fetchAll,
    findById,
    create,
    update,
    remove
}