const { body } = require("express-validator");

const validateTopup = () => {
    body('top_up_amount').isNumeric().withMessage('Top Up amount harus berupa angka');
    body('top_up_amount').isInt({ min: 0 }).withMessage('Top Up amount minimal 0');
}

module.exports = {
    validateTopup
}