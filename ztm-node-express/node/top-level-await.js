const getData = await fetch("https://jsonplaceholder.typicode.com/users");
const resp = await getData.json();
console.log(resp);

if (true) {
    // use of import function () as not longer a globle import
    try {
        const {largeNumber} = await import('./ES6inNodeJs/exportFile.js');
        const a = largeNumber;
        console.log(a);
    } catch (error) {
        console.log(error);
    }
}
