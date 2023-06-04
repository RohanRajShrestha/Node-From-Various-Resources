const express = require('express');
const app = express();

const PORT = 5000;
/**
 * Type of error 
 * Programmer Error
 * Operational Error
 * - we will be handling Operational Errors
*/
// using promise
const {api} = require('./api/ErrorHandleWithPromise');

// importing our error handling middleware
const {errorHandler} = require('./middleware/errorHandler');
const { tryCatch } = require('./utils/tryCatch');

// requiring custom error
const CustomError = require("./CustomError");

const getUser = () => undefined;
const getSubscription = () => undefined;

app.use(api);
console.log('here');
app.use( (error, req, res, next) => {
    console.log(error);
})
// one way to catch is usin try catch for all 
app.use('/test', (req, res) => {
    const user = getUser();
    if (!user) {
        throw new Error(`User Not Found`); // is no try catch express will just throw the error to the request
    }
    // res.send(`hello from Server Side, port ${PORT}`);
});

app.use('/using-try-catch', (req, res) => {
    // this gets repititive as we will have to write try catch for all the routes
    try {
        const user = getUser();
        if (!user) {
            throw new Error(`User Not Found`);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
});

// so we will use middleware to handle the errors
app.use('/using-try-catch-middleware', (req, res, next) => {
    // this gets repititive as we will have to write try catch for all the routes
    console.log('here');
    try {
        const user = getUser();
        if (!user) {
            throw new Error(`User Not Found`);
        }
    } catch (error) {
        console.log(error);
        /**
         * this tells node to go to next function
         * don't forget to pass error in next
        */
        next(error); 
    }
});

// creating abstraction for try catch to remove it from the controller
app.use('/using-try-catch-abstract-middleware', tryCatch(async (req, res) => {
    // this gets repititive as we will have to write try catch for all the routes
    console.log('here');
    if (!user)
        throw new Error(`User Not Found`);

    return res.status(200).json({success:true});
        
}));

app.use('/login', () => {

});

/***
 * For custom error handling we are required to specify ta catch these error separatly if we don't want usual response
*/
app.use('/subscription', tryCatch(async (req, res) => {
    // if (error) throw error;
    const subscription = getSubscription();
    if (!subscription) {
      throw new CustomError(500, "Subscription not found", 400);
    }
}));

app.use('/', (req, res) => {
    res.send(`hello from Server Side, port ${PORT}`);
})
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server stattrted at port : ${PORT}`);
})