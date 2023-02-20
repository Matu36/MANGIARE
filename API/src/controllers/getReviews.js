const { Reviews, Users } = require("../db.js");

module.exports = async (req, res) => {
  try {
    if (!req.query?.id || !req.query?.email || !req.query?.active)
      throw "No body query or inactive user";

    let requestUser = await Users.findOne({
      where: { id: req.query.id, email: req.query.email, active: true },
    });

    if (!requestUser) return res.status(403).send("Wrong user");

    let returnedReviews;

    if (requestUser.dataValues.role !== null)
      returnedReviews = await Reviews.findAll();
    else
      returnedReviews = await Reviews.findAll({
        where: { userId: req.query.id },
      });

    return !returnedReviews
      ? res.status(404).send("Reviews Not Found")
      : res.send(returnedReviews);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
