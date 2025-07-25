const db = require("../../config/db");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const registerUser = async ({ first_name, last_name, email, password }) => {
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
        `INSERT INTO users (id, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)`,
        [id, first_name, last_name, email, hashedPassword]
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
    updateUserBalance,
}