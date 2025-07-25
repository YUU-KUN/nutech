const { responseHelper } = require("../../utils/responseHelper");
const { getBanners, getServices } = require("./service");

const banner = async (req, res, next) => {
    try {
        const banners = await getBanners();
        return responseHelper(res, 'Sukses', banners);
    } catch (error) {
        next(error);
    }
}

const service = async (req, res, next) => {
    try {
        const services = await getServices();
        return responseHelper(res, 'Sukses', services);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    banner,
    service
}