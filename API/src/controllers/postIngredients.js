const { Ingredients, Ingredient_units } = require("../db.js");

module.exports = async (req, res) => {
  try {
    if (!req.body?.id || !req.body?.name || !req.body?.price)
      throw "No body params";

    let { id, name, price, units } = req.body;

    await Ingredients.create({ id, name, price });

    if (units) {
      units.forEach(async (u) => {
        await Ingredient_units.create({ ingredientId: id, unit: u });
      });
    }

    let newIngredient = await Ingredients.findByPk(id, {
      include: "Ingredient_units",
      required: false,
    });

    newIngredient = {
      id: newIngredient.id,
      name: newIngredient.name,
      price: newIngredient.price,
      units: newIngredient.Ingredient_units.map(({ unit }) => unit),
    };

    return !newIngredient
      ? res.status(404).send("Ingredient Not Found")
      : res.send(newIngredient);
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
};
