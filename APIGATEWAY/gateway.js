const express = require('express');
const routes = require("./routes");
// initializing express
const app = express();

const PORT = 3000
// require express to use json
app.use(express.json());

// handling request from api
// whenever request is send it is send to routes file
/**
 * Node will loop for idnde.x js instead of routes folder
*/
app.use('/', routes)

// setting up server
app.listen(PORT, () => {
    console.log("Gateway Initialized ON  PORT : " + PORT)
});