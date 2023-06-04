const os = require('os')
const path = require('path')

const math = require('./math')

/**
 * Can also import by destructuring as
 * const {add} = require('./math);
 * then const a = add(4, 4);
*/

console.log('hello');
console.log(math.add(4 , 4));

console.log(os.type());