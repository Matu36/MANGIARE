const router = require('express').Router();
const getRecipes = require('../controllers/getRecipes');
const postRecipe = require('../controllers/postRecipe');

router.get('/:id', getRecipes);
router.get('/', getRecipes);
router.post('/', postRecipe);

module.exports = router;