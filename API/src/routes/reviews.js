const router = require('express').Router();
const getReviews = require('../controllers/getReviews');
const postReview = require('../controllers/postReview');

router.get('/user/:userId', getReviews);
router.get('/recipe/:recipeId', getReviews);
router.get('/', getReviews);
router.post('/', postReview);

module.exports = router;