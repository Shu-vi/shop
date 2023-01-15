const {BasketDevice} = require('../models/models');
const {Basket} = require('../models/models');
const ApiError = require("../error/ApiError");

class BasketController {
    async create(req, res, next) {
        let {deviceId} = req.body;
        const user = req.user;
        if (!deviceId || !user.id)
            return next(ApiError.badRequest('Некорректный id'));
        const basket = await Basket.findOne({where: {userId: user.id}});
        const basketDevice = await BasketDevice.create({deviceId, basketId: basket.id});
        return res.status(200).json(basketDevice);
    }

    async delete(req, res) {
        const {id} = req.params
        if (!id)
            return;
        const basketDevice = await BasketDevice.destroy({where: {id}});
        return res.status(200).json(basketDevice);
    }

    async getAll(req, res, next) {
        const {id} = req.params
        if (!id || id === 'undefined') {
            return next(ApiError.badRequest('Некорректный id'));
        }
        const basket = await Basket.findOne({where: {userId: id}});
        const basketDevice = await BasketDevice.findAll({where: {basketId: basket.id}});
        return res.status(200).json(basketDevice);
    }
}

module.exports = new BasketController();