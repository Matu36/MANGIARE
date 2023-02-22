const { Reviews, Users } = require("../db.js");

module.exports = async (req, res) => {
  try {
    let requestUser;

    if (req.query?.id && req.query?.email)
      requestUser = await Users.findOne({
        where: { id: req.query.id, email: req.query.email },
      });

    let returnedReviews;

    if (requestUser && requestUser?.dataValues.role !== null)
      returnedReviews = await Reviews.findAll({
        include: { model: Users, attributes: ["email"] },
      });
    else
      returnedReviews = await Reviews.findAll({
        where: { visible: true },
        include: { model: Users, attributes: ["email"] },
      });

    return !returnedReviews
      ? res.status(404).send("Reviews Not Found")
      : res.send(returnedReviews);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
