const jwt = require('jsonwebtoken');
const { responseHelper } = require('../utils/responseHelper');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        res.statusCode = 401;
        return responseHelper(res, 'Token tidak ditemukan', null);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.statusCode = 401;
            return responseHelper(res, "Token tidak tidak valid atau kadaluwarsa", null);
        }

        req.user = decoded;
        next();
    });
}

module.exports = verifyToken;