class CustomError extends Error {
    constructor (errorcode, message, statusCode) {
        super(message);
        this.errorCode = errorcode;
        this.statusCode = statusCode;
    }
}
module.exports = CustomError;