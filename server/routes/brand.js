const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brand');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.post('/', authMiddleware, checkRole, brandController.create);
router.get('/', brandController.getAll);

module.exports = router;