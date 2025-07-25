const { validationResult } = require("express-validator");
const { responseHelper } = require("../utils/responseHelper");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    const errMsg = errors?.array()[0]?.msg;
    if (!errors.isEmpty()) {
        res.statusCode = 400;
        return responseHelper(res, errMsg);
    }
    next();
};

module.exports = validateRequest;