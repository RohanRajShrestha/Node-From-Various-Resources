require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// why we need this package understand
const cookieParser = require('cookie-parser');

const path = require('path');
const {logger} = require('./middleware/logEvent');
const {errorHandler} = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3500;
const mongoose= require('mongoose');
const {connectDB} = require('./config/dbConn');
// mmiddleware
const { verifyJWT } = require('./middleware/verfiyJWT');

connectDB();
// this is for cors() to whitelist only limited resources to access our website

// this stands for cross origin resource sharing
/**
 * Cross origin resource sharing
 * It will be fine if you want everyone to use ths api publicly
 * Study more about cors
 * see by removing google.com anf use fetch('http://localhost:3500/') on console
*/
app.use(cors(corsOptions));

// custom middleware logger
/***
 * While building custom middleware remeber to have next in it
*/
app.use(logger);


// build in middleware to handle urlencoded data
/**
 * the app.use will be implemented for all the route below it
 * it is to get the form data
*/
// app.use(express.urlencoded({extened : false}));

/**
 *This is a built in middleware for json data
 */
app.use(express.json());

/**
 * 
 * Middleware for cookie parser
*/
app.use(cookieParser());

/**
* This is a built in middleware serve static files
* This will search for items before in public folder
*/
app.use('/',express.static(path.join(__dirname, '/public')));
app.use('/subdir',express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/register', require('./routes/register'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/subdir', require('./routes/subdir'));
app.use('/employee', require('./routes/api/employee'));


// route handlers
// chaining tasks to be performed in after middleware 
app.get('/hello(.html)?', (req, res, next) => {
    console.log('Attempting to learn node');
    next();
}, (req, res) => {
    res.send("Hello World");
})

// another way to chain multiple process is as follow
const one = (req, res, next) => {
    console.log('This will go first');
    next();
}

const two = (req, res, next) => {
    console.log('This will go second');
    next();
}

const three = (req, res, next) => {
    console.log('This will go third');
    res.send('End');
}

app.get('/chain(.html)?', [one, two, three]);
// app.get('/*', (req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// })

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({error : '404 Not Found'});
    } else {
        res.type('txt').send('404 txt Not Found')
    }
})

/**
 * Build in error handling in Express JS
 * Adding custom error handlin in express
*/

app.use(errorHandler);

// connects and emits the open even 
mongoose.connection.once('open', () => {
    console.log('Connected to mogo db');
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
})

/**
 * Comparing app.use vs app.all
 * app.use('/') doesn't support regix 
 * it is for more use in middleware
 * app.all('*') does support regix 
 * it it more of used for routing
*/