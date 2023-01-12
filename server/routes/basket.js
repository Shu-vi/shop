const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basket');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, basketController.create);
router.delete('/:id', authMiddleware, basketController.delete);
router.get('/:id', authMiddleware, basketController.getAll);

module.exports = router;