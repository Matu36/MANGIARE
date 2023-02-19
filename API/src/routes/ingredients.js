const router = require("express").Router();
const getIngredients = require('../controllers/getIngredients');
const postIngredients = require('../controllers/postIngredients');

router.get('/', getIngredients);
router.post('/', postIngredients);

module.exports = router;
