const Router = require('express');
const router = new Router();
const typeController = require('../controllers/type');
const checkRole = require('../middleware/checkRole');

// domen.ru/api/type/
router.post('/', checkRole('ADMIN'), typeController.create);
router.get('/', typeController.getAll);

module.exports = router;