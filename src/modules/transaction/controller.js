const { v4: uuidv4 } = require('uuid');
const { responseHelper } = require("../../utils/responseHelper");
const { findUserByEmail, updateUser, updateUserBalance } = require("../membership/service");
const { createTransaction, getUserTransactions, getServiceByCode } = require("./service");

const balance = async (req, res, next) => {
    try {
        const { balance } = await findUserByEmail(req.user.email);
        return responseHelper(res, 'Get Balance Berhasil', { balance });
    } catch (error) {
        next(error);
    }
}

const topup = async (req, res, next) => {
    try {
        const { top_up_amount } = req.body;
        if (top_up_amount < 0 || isNaN(top_up_amount)) {
            res.statusCode = 400;
            return responseHelper(res, 'Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0');
        }

        const { email, balance } = await findUserByEmail(req.user.email);
        const newBalance = balance + top_up_amount;

        const uuid = uuidv4();
        const created_on = new Date();
        const invoice_number = `INV${created_on.getFullYear()}${created_on.getMonth() + 1}${created_on.getDate()}-${uuid.slice(0, 3)}`;

        const transactionData = {
            id: uuid,
            user_id: req.user.id,
            service_id: null,
            invoice_number,
            transaction_type: 'TOPUP',
            total_amount: top_up_amount,
            created_on: created_on,
        }

        await createTransaction(transactionData);
        await updateUserBalance(email, newBalance);

        return responseHelper(res, 'Top Up Balance berhasil', { balance: newBalance });
    } catch (error) {
        next(error)
    }
}

const history = async (req, res, next) => {
    try {
        const { offset, limit } = req.query

        if (isNaN(offset) || isNaN(limit)) {
            res.statusCode = 400;
            return responseHelper(res, 'Parameter offset dan limit hanya boleh angka', null);
        }

        const options = {
            offset: parseInt(offset) || 0,
            limit: parseInt(limit) || 0
        }

        const transactions = await getUserTransactions(req.user.id, options);
        const response = {
            records: transactions,
            ...options,
        }

        return responseHelper(res, 'Get History Berhasil', response);
    } catch (error) {
        next(error);
    }
}

const transaction = async (req, res, next) => {
    try {
        const { service_code } = req.body;
        const service = await getServiceByCode(service_code);
        if (!service) {
            res.statusCode = 400;
            return responseHelper(res, 'Service atau Layanan tidak ditemukan', null);
        }

        const { email, balance } = await findUserByEmail(req.user.email);
        const newBalance = balance - service.service_tariff;

        if (newBalance < 0) {
            res.statusCode = 400;
            return responseHelper(res, 'Saldo tidak mencukupi', null);
        }

        const uuid = uuidv4();
        const created_on = new Date()
        // INV17082023-001
        const invoice_number = `INV${created_on.getFullYear()}${created_on.getMonth() + 1}${created_on.getDate()}-${uuid.slice(0, 3)}`

        const transactionData = {
            id: uuid,
            user_id: req.user.id,
            service_id: service.id,
            invoice_number,
            transaction_type: 'PAYMENT',
            total_amount: service.service_tariff,
            created_on
        }

        await createTransaction(transactionData);
        await updateUserBalance(email, newBalance);

        const { id, user_id, service_id, ...rest } = transactionData;

        const response = {
            service_code: service.service_code,
            service_name: service.service_name,
            ...rest,
        }

        return responseHelper(res, 'Transaksi berhasil', response);

    } catch (error) {
        next(error)
    }
}

module.exports = {
    balance,
    topup,
    history,
    transaction,
}