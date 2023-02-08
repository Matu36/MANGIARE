const {Recipes} = require('../db.js');

module.exports = async (req, res) => {
  try{

    let recipes = await Recipes.findAll(
      (!req.params?.id)
        ? {include: ['Recipe_diets', 'Recipe_ingredients'], required: false}
        : {include: ['Recipe_diets', 'Recipe_ingredients'], required: false, where: {id: req.params?.id}}
    )

    return (!recipes.length)
      ? res.status(404).send('Recipes Not Found')
      : res.send(recipes.map(({id, title, instructions, image, Recipe_diets, Recipe_ingredients}) => ({id, title, instructions, image, diets: Recipe_diets.map(({diet}) => diet), ingredients: Recipe_ingredients.map(({ingredientId, amount, unit}) => ({id: ingredientId, amount, unit}))})));
  }
  catch(error) {
    console.log(error);
    return res.status(404).send('Error 404');
  }
};