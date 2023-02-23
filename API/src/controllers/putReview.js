const { Reviews } = require("../db");

const putReview = async (req, res) => {
  try {
    let { recipeId, userId } = req.body;
    if (!recipeId && !userId) {
      return res.status(404).send("No body Params");
    }
    let review = await Reviews.findOne({
      where: { recipeId, userId },
    });
    if (!review) {
      return res.status(404).send("Visible review not found");
    }
    let result = await review.update({ visible: req.body.visible });
    return res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};
module.exports = putReview;
