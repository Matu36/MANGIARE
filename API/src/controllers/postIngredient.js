const { Ingredients, Ingredient_units } = require("../db.js");

module.exports = async (req, res) => {
  try {
    if (!req.body?.name || !req.body?.price || !req.body?.stock) throw "No body params";

    const { name, price, units, stock } = req.body;

    const generateNewId = async () => {
      const maxId = await Ingredients.max("id");
      const newId = maxId ? maxId + 1 : 1;
      return newId;
    };

    let id = await generateNewId();

    let createdIngredient = await Ingredients.create({ id, ...req.body });

    await Ingredient_units.bulkCreate(
      units.map((u) => ({
        ingredientId: id,
        unit: u
      }))
    );

    return res.status(201).send(createdIngredient);
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
};
