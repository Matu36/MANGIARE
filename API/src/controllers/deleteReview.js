const { Reviews } = require("../db");

const deleteReview = async (req, res) => {
  try {
    const { userId, recipeId } = req.body;
    await Reviews.destroy({
      where: {
        userId,
        recipeId,
      },
    });

    res.status(200).send("Review successfully removed");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = deleteReview;
