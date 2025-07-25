const db = require("../../config/db");

const getBanners = async () => {
    const [banners] = await db.query('SELECT * FROM banners');
    return banners;
}

const getServices = async () => {
    const [services] = await db.query(
        'SELECT * FROM services');
    return services;
}

module.exports = {
    getBanners,
    getServices
}