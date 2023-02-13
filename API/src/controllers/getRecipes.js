const {Recipes, Recipe_ingredients, Ingredients} = require('../db.js');

module.exports = async (req, res) => {
  try{
    let recipes = await Recipes.findAll(
      (!req.params?.id)
        ? {include: ['Recipe_diets', {model: Recipe_ingredients, include: {model: Ingredients}}, 'Reviews']}
        : {include: ['Recipe_diets', {model: Recipe_ingredients, include: {model: Ingredients}}, 'Reviews'], where: {id: req.params.id}}
    )

    return (!recipes)
      ? res.status(404).send('Recipes Not Found')
      : res.send(recipes.map(({id, title, instructions, Reviews, image, Recipe_diets, Recipe_ingredients, userId}) => ({id, title, instructions, image, userId, diets: Recipe_diets.map(({diet}) => diet), Reviews, rating: Math.round(Reviews.reduce((aux, {rate}) => aux + rate, 0) / Reviews.length), ingredients: Recipe_ingredients.map(({ingredientId, amount, unit}) => ({id: ingredientId, amount, unit})), price: Recipe_ingredients.reduce((aux, {Ingredient, amount}) => aux + Ingredient.price * amount, 0)})));
  }
  catch(error) {
    console.log(error);
    res.status(500).send(error);
  }
};