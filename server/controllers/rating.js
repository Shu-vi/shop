const {Rating, Device} = require('../models/models');
const ApiError = require("../error/ApiError");


const updateRateDevice = async (device) => {
    const rates = await Rating.findAll({where: {deviceId: device.id}});
    let avgRate = 0;
    if (rates.length > 0) {
        avgRate = rates.reduce((acc, currentValue) => {
            return acc + currentValue.rate;
        }, 0) / rates.length;
    }
    device.rating = avgRate;
    await Device.update(device, {where: {id: device.id}});
}

const emptyRateObject = {
    id: null,
    rate: 0,
    userId: null,
    deviceId: null
};

class RatingController {

    async createRating(req, res) {
        const user = req.user;
        const rating = req.body.rate;
        const device = req.body.device;
        const updatedRate = await Rating.update({rate: rating}, {where: {userId: user.id, deviceId: device.id}});
        if (updatedRate[0]) {
            await updateRateDevice(device);
            const response = await Rating.findOne({where: {userId: user.id, deviceId: device.id}});
            return res.json(response);
        } else {
            const newRate = await Rating.create({userId: user.id, rate: rating, deviceId: device.id});
            await updateRateDevice(device);
            return res.json(newRate);
        }
    }

    async fetchRating(req, res, next) {
        const {deviceId} = req.query;
        const user = req.user;
        if (deviceId) {
            const rate = await Rating.findOne({where: {userId: user.id, deviceId}});
            if (rate) {
                return res.json(rate);
            } else {
                return res.json(emptyRateObject);
            }
        } else {
            return next(ApiError.badRequest('Не передан deviceId'));
        }
    }
}

module.exports = new RatingController();