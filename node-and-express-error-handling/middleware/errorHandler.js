// requiring custom error
const CustomError = require("../CustomError");

const errorHandler = (error, req, res, next) => {
    console.log(error);

    if (error instanceof CustomError) {
        console.log(error.statusCode);
        console.log(error.statusCode);

        return res.status(error.statusCode).json({
            errorCode: error.errorCode,
        });
    }
    return res.status(400).send(`Error handling from middlware : ${error.message}`);
}

module.exports = {errorHandler};