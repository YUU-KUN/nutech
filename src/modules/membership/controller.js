const { responseHelper } = require("../../utils/responseHelper");
const { registerUser, findUserByEmail, updateUser } = require("./service");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registration = async (req, res, next) => {
    try {
        await registerUser(req.body);
        return responseHelper(res, 'Registrasi berhasil silahkan login', null);
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if (!user) {
            res.statusCode = 400;
            return responseHelper(res, 'User tidak ditemukan', null);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.statusCode = 401;
            return responseHelper(res, 'Email atau password salah', null);
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "12h",
            }
        )
        return responseHelper(res, 'Login Sukses', { token });
    } catch (error) {
        next(error);
    }
};

const getProfile = async (req, res, next) => {
    try {
        const { email, first_name, last_name, profile_image } = await findUserByEmail(req.user.email);
        return responseHelper(res, 'Sukses', { email, first_name, last_name, profile_image });
    } catch (error) {
        next(error);
    }
}

const updateProfile = async (req, res, next) => {
    try {
        const currentEmail = req.user.email;
        const existingUser = await findUserByEmail(req.user.email);
        const newData = {
            email: req.body.email || existingUser.email,
            first_name: req.body.first_name || existingUser.first_name,
            last_name: req.body.last_name || existingUser.last_name,
            profile_image: req.body.profile_image || existingUser.profile_image,
        };

        await updateUser(currentEmail, newData);
        return responseHelper(res, 'Update Pofile berhasil', newData);
    } catch (error) {
        next(error);
    }
}

// TODO
const updateProfileImage = async (req, res, next) => {
    try {
        const currentEmail = req.user.email;
        const { profile_image } = req.body;
        await updateUser(currentEmail, { profile_image });
        return responseHelper(res, 'Update Profile Image berhasil', { profile_image });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    registration,
    login,
    getProfile,
    updateProfile,
}