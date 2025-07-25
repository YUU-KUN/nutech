const { body } = require('express-validator');
const db = require('../../config/db');

const registerValidator = [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Email tidak valid'),
    body('email').custom(async (value, { req }) => {
        const { email } = req.body;
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (user.length > 0) {
            throw new Error('Email sudah terdaftar');
        }
    }),
    body('password').isLength({ min: 8 }).withMessage('Password minimal 8 karakter'),
];

const loginValidator = [
    body('email').isEmail().withMessage('Email tidak valid'),
    body('password').isLength({ min: 8 }).withMessage('Password minimal 8 karakter'),
]

module.exports = {
    registerValidator,
    loginValidator,
};
