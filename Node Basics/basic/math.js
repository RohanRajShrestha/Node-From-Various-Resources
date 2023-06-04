/**
 * Here, we are creating out own package
*/

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

/**
 * Other way to export in node
 * exports.add = (a, b) => a + b ;
 * exports.subtract = (a, b) => a - b;
*/

// exporting the funcitons
module.exports = {
    add, subtract, multiply, divide
}