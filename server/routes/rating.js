const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth');
const ratingController = require('../controllers/rating');

router.post('/', authMiddleware, ratingController.createRating);
router.get('/', authMiddleware, ratingController.fetchRating);


module.exports = router;