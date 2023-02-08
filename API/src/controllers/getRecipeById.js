const {Recipes} = require('../db.js');

module.exports = (req, res) => {
  // devuelve la receta id: req.params.id o 404 si no existe
  // en el caso que id sea 'daily' devolver 3 recetas random
  //siempre devolver el resultado dentro de un array (aunque tenga una sola receta)

  const getIdRecipe = async (req, res) => {
    try {
      const { idrecipe } = req.params;
      let recipes = await Recipes.findByPk({
        where: 'Recipe_diets',
        required: false,
      });
      recipe ? res.status(SUCCESS).json(recipe) 
      : res.status(NOT_FOUND).json({msg : 'La receta que esta solicitando no se encuentra'});
    } catch(err) {
      res.status(SERVICE_UNAVAILABLE).json(err)
    }
  }
}