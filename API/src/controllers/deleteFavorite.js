const { Favorites } = require("../db");

const deleteFavorite = async (req, res) => {
  try {
    const { userId, recipeId } = req.body;

    if (!userId || !recipeId) {
      throw new Error("Missing required parameters");
    }

    await Favorites.destroy({
      where: {
        userId,
        recipeId,
      },
    });

    res.status(200).send("favorite successfully removed");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message || "Error removing favorite");
  }
};

module.exports = deleteFavorite;
