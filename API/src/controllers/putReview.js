const { Reviews } = require("../db");

const putReview = async (req, res) => {
  try {
    let { recipeId, userId } = req.body;
    if (!recipeId && !userId) {
      return res.status(400).send("No body Params");
    }

    //como reviews no tiene una PK incremental no puedo seleccionar un review correcto a banear y por eso
    //selecciono todos los comentarios de un usuario en una receta.
    let reviews = await Reviews.findAll({
      where: { recipeId, userId },
    });

    if (!reviews || reviews.length === 0) {
      return res.status(400).send("Visible reviews not found");
    }
    for (let review of reviews) {
      await review.update({ visible: req.body.visible });
    }
    return res.status(200).send("Review updated successfully");

  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

module.exports = putReview;
