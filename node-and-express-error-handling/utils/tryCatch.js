// we don't need this here just so that we can see the error type
const CustomError = require("../CustomError");


exports.tryCatch = (controller) => async (req, res, next) => {
    try {
        console.log('inside try catch');
        await controller (req, res);
    } catch (error) {
        // console.log(error);
        if (error instanceof CustomError) {
            return next(error);
        }
        return next(new Error(`We passing through try catch : User Not found`));
    }
}