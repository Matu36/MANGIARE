const { Recipes, Recipe_diets, Recipe_ingredients } = require("../db");
const {Op} = require('sequelize');

const postRecipe = async (req, res) => {
  try {
    const { title, image, diets, instructions, ingredients } = req.body;

    let id = 1 + await Recipes.count({
      where: {
        id: {
          [Op.lt]: 60000
        }}
      });

    let createdRecipe = await Recipes.create({
      id,
      title,
      instructions,
      image,
    });
    
    await Recipe_ingredients.bulkCreate(
      ingredients.map((el) => ({
        recipeId: id,
        ingredientId: el.id,
        amount: el.amount,
        unit: el.unit,
      }))
    );
    
    await Recipe_diets.bulkCreate(
      diets.map((el) => ({
        recipeId: id,
        diet: el,
      }))
    );

    res.status(200).send(createdRecipe);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = postRecipe;
