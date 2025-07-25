const express = require('express');
const { registration, login, getProfile, updateProfile, updateProfileImage } = require('../modules/membership/controller');
const { loginValidator, registerValidator } = require('../modules/membership/validator');
const validateRequest = require('../middlewares/validateRequest');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.post('/registration', registerValidator, validateRequest, registration);
router.post('/login', loginValidator, validateRequest, login)

router.get('/profile', verifyToken, getProfile);
router.put('/profile/update', verifyToken, updateProfile);
router.put('/profile/image', verifyToken, updateProfileImage);

module.exports = router;