const router = require("express").Router();
const getIngredients = require('../controllers/getIngredients');

router.get('/', getIngredients);

module.exports = router;
