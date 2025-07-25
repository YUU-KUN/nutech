const { responseHelper } = require("../utils/responseHelper");

const errorHandler = (err, req, res, next) => {
    console.error('Error caught by middleware:', err);

    let statusCode = 500;
    let message = 'Internal server error';

    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = err.message;
    }

    res.statusCode = statusCode;

    return responseHelper(res, message, null);

};

module.exports = errorHandler;