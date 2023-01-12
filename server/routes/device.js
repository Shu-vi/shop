const Router = require('express');
const router = new Router();
const deviceController = require('../controllers/device');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.post('/', authMiddleware, checkRole('ADMIN'), deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);

module.exports = router;