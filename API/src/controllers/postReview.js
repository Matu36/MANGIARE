const {Reviews} = require("../db");

const postReview = async (req, res) => {
  const {userId,recipeId,rate,comment,image} = req.body;
  try {
  let postReview=await Reviews.create({
    userId,
    recipeId,
    rate,
    comment,
    image
  })


    res.status(200).send(postReview);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = postReview;