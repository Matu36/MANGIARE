const router = require("express").Router();
const getIngredients = require('../controllers/getIngredients');
const postIngredient = require('../controllers/postIngredient');
const putIngredient = require('../controllers/putIngredient');

router.get('/', getIngredients);
router.post('/', postIngredient);
router.put('/', putIngredient);

module.exports = router;
