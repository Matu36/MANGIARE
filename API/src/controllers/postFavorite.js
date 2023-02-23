const { Favorites } = require("../db.js");

module.exports = async (req, res) => {
  try {
    if (!req.body?.userId || !req.body?.recipeId) throw "No body params";

    let response = await Favorites.create(req.body);

    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
