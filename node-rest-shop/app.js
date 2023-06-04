const express  = require('express');
const app = express();

// this sets up an midllerware 
app.use((req, res, next) => {
    res.status(200).json({
        message : 'IT Works'
    });
});

module.exports = {
    app
}