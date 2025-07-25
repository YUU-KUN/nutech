const db = require("../../config/db");
const bcrypt = require('bcrypt');

const registerUser = async ({ id, first_name, last_name, email, password, profile_image }) => {
    const [result] = await db.query(
        `INSERT INTO users (id, first_name, last_name, email, password, profile_image) VALUES (?, ?, ?, ?, ?, ?)`,
        [id, first_name, last_name, email, password, profile_image]
    );
    return result.insertId;
}

const findUserByEmail = async (email) => {
    const [result] = await db.query(
        `SELECT * FROM users WHERE email = ?`,
        [email]
    );
    return result[0];
}

const updateUser = async (currentEmail, { email, first_name, last_name, profile_image }) => {
    const [result] = await db.query(
        `UPDATE users SET email = ?, first_name = ?, last_name = ?, profile_image = ? WHERE email = ?`,
        [email, first_name, last_name, profile_image, currentEmail]
    );
    return result.affectedRows;
}

const updatePhoto = async (email, profile_image) => {
    const [result] = await db.query(
        `UPDATE users SET profile_image = ? WHERE email = ?`,
        [profile_image, email]
    );
    return result.affectedRows;
}

const updateUserBalance = async (email, balance) => {
    const [result] = await db.query(
        `UPDATE users SET balance = ? WHERE email = ?`,
        [balance, email]
    );
    return result.affectedRows;
}


module.exports = {
    registerUser,
    findUserByEmail,
    updateUser,
    updatePhoto,
    updateUserBalance,
}