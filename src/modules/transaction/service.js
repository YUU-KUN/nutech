const db = require('../../config/db');

const getUserTransactions = async (user_id, { offset = 0, limit = 0 } = {}) => {
    const query = `
        SELECT invoice_number, transaction_type, total_amount, created_on
        FROM transactions 
        LEFT JOIN services ON transactions.service_id = services.id
        WHERE transactions.user_id = ? 
        ORDER BY transactions.created_on DESC
        ${limit ? `LIMIT ${limit} OFFSET ${offset}` : ''}
    `;

    const [result] = await db.query(
        query,
        [user_id]
    )
    return result
}

const getServiceByCode = async (code) => {
    const [result] = await db.query(
        'SELECT * FROM services WHERE service_code = ?',
        [code]
    )
    return result[0]
}

const createTransaction = async ({ id, user_id, service_id, invoice_number, transaction_type, total_amount, created_on }) => {
    const [result] = await db.query(
        `INSERT INTO transactions (id, user_id, service_id, invoice_number, transaction_type, total_amount, created_on) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, user_id, service_id, invoice_number, transaction_type, total_amount, created_on]
    );
    return result.insertId;

}

module.exports = {
    getUserTransactions,
    createTransaction,
    getServiceByCode,
}