const Router = require('express');
const router = new Router();
const deviceRouter = require('./device');
const brandRouter = require('./brand');
const typeRouter = require('./type');
const userRouter = require('./user');
const basketRouter = require('./basket');

router.use('/user', userRouter);
router.use('/device', deviceRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/basket', basketRouter);

module.exports = router;