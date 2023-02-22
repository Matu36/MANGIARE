const { Reviews, Users } = require("../db");

const postReview = async (req, res) => {
  try {
    if ((await Users.findByPk(req.body.userId)).banned) throw 'User banned';

    const { userId, recipeId, rate, comment = null, image = null} = req.body;
    let postReview = await Reviews.create({
      userId,
      recipeId,
      rate,
      comment,
      image
    });

    res.status(200).send(postReview);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = postReview;
