const router = require('express').Router();
const getRecipes = require('../controllers/getRecipes');
const postRecipe = require('../controllers/postRecipe');


router.get('/', getRecipes);
router.post('/', postRecipe);
router.get('/:id', getRecipes);

module.exports = router;