const { responseHelper } = require("../../utils/responseHelper");
const { registerUser, findUserByEmail, updateUser, updatePhoto } = require("./service");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const registration = async (req, res, next) => {
    try {
        const { email, first_name, last_name, password } = req.body;

        const newUser = {
            id: uuidv4(),
            first_name,
            last_name,
            email,
            password: await bcrypt.hash(password, 10),
            profile_image: 'profile.jpg' //default avatar image
        }

        await registerUser(newUser);
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
        const { id, password, profile_image, balance, ...restUserData } = await findUserByEmail(req.user.email);

        const baseUrl = `${req.protocol}://${req.hostname}`
        const response = {
            ...restUserData,
            profile_image: process.env.NODE_ENV === 'development' ? `${baseUrl}:${process.env.PORT}/${profile_image}` : `${baseUrl}/${profile_image}`
        }
        return responseHelper(res, 'Sukses', response);
    } catch (error) {
        next(error);
    }
}

const updateProfile = async (req, res, next) => {
    try {
        const currentEmail = req.user.email;
        const { email, first_name, last_name, profile_image } = await findUserByEmail(currentEmail);
        const newData = {
            email,
            first_name: req.body?.first_name || first_name,
            last_name: req.body?.last_name || last_name,
            profile_image,
        };

        await updateUser(currentEmail, newData);

        const baseUrl = `${req.protocol}://${req.hostname}`
        const response = {
            ...newData,
            profile_image: process.env.NODE_ENV === 'development' ? `${baseUrl}:${process.env.PORT}/${profile_image}` : `${baseUrl}/${profile_image}`,
        }
        return responseHelper(res, 'Update Pofile berhasil', response);
    } catch (error) {
        next(error);
    }
}

const updateProfileImage = async (req, res, next) => {
    try {
        const baseUrl = `${req.protocol}://${req.hostname}`

        if (!req.files || Object.keys(req.files).length === 0) {
            res.statusCode = 400;
            return responseHelper(res, 'Tidak ada file yang diupload', null);
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(req.files.file.mimetype)) {
            res.statusCode = 400;
            return responseHelper(res, 'Format Image tidak sesuai', null);
        }

        const file = req.files.file
        const fileName = Date.now() + '-' + file.name
        file.mv(`./public/${fileName}`, (err) => {
            if (err) {
                res.statusCode = 500;
                return responseHelper(res, 'Gagal upload file', null);
            }
        })

        const currentEmail = req.user.email;
        await updatePhoto(currentEmail, fileName);

        const existingUser = await findUserByEmail(currentEmail);

        const response = {
            email: existingUser.email,
            first_name: existingUser.first_name,
            last_name: existingUser.last_name,
            profile_image: process.env.NODE_ENV === 'development' ? `${baseUrl}:${process.env.PORT}/${fileName}` : `${baseUrl}/${fileName}`
        }
        return responseHelper(res, 'Update Profile Image berhasil', response);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    registration,
    login,
    getProfile,
    updateProfile,
    updateProfileImage,
}