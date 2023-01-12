const Router = require('express');
const router = new Router();
const typeController = require('../controllers/type');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// domen.ru/api/type/
router.post('/', checkRole('ADMIN'), authMiddleware, typeController.create);
router.get('/', typeController.getAll);

module.exports = router;