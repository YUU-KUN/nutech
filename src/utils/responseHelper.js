const responseHelper = (res, message, data = null) => {
    // code 200 = 0, code 400 = 102, code 401 = 108
    let status = 0
    switch (res.statusCode) {
        case 200:
            status = 0
            break;
        case 400:
            status = 102
            break;
        case 401:
            status = 108
            break;
        default:
            break;
    }

    return res.status(res.statusCode).json({
        status,
        message,
        data,
    });
}

module.exports = {
    responseHelper
}