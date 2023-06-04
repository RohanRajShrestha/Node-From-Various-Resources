const allowedOrigins = ["https://www.yourwebsite.com", "http:127.0.01:5500", "https://www.google.com/"];
const corsOptions = {
    origin : (origin, callback) => { // origin inside is where the request comes from
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) { // add origin for only development
            callback(null, true);
        } else {
            callback(new Error('Not Alloed By CORS'));
        }
    }, 
    optionsSuccessStatus : 200 
}

module.exports = corsOptions;