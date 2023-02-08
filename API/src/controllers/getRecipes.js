const {Recipes} = require('../db.js');

module.exports = async (req, res) => {
  try{
    let recipes = await Recipes.findAll(
      (!req.params?.id)
        ? {include: ['Recipe_diets', 'Recipe_ingredients']}
        : {include: ['Recipe_diets', 'Recipe_ingredients'], where: {id: req.params.id}}
    )

    return (!recipes)
      ? res.status(404).send('Recipes Not Found')
      : res.send(recipes.map(({id, title, instructions, image, Recipe_diets, Recipe_ingredients}) => ({id, title, instructions, image, diets: Recipe_diets.map(({diet}) => diet), ingredients: Recipe_ingredients.map(({ingredientId, amount, unit}) => ({id: ingredientId, amount, unit}))})));
  }
  catch(error) {
    console.log(error);
    res.status(500).send(error);
  }
};