const router = require('express').Router();
const getFavorites = require('../controllers/getFavorites');
const postFavorite = require('../controllers/postFavorite');

router.get('/:userId', getFavorites);
router.get('/', getFavorites);
router.post('/', postFavorite);

module.exports = router;