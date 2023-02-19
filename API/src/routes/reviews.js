const router = require('express').Router();
const getReviews = require('../controllers/getReviews');
const postReview = require('../controllers/postReview');

router.get('/', getReviews);
router.post('/', postReview);

module.exports = router;