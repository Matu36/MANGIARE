const { Users } = require("../db.js");

module.exports = async (req, res) => {
  try {
    if (!req.query?.id || !req.query?.email || !req.query?.active)
      throw "No query params or inactive user";

    let requestUser = await Users.findOne({
      where: { id: req.query.id, email: req.query.email, active: true },
    });

    if (!requestUser) return res.status(403).send("Wrong user");

    let returnedUsers;
    let returnedUser;

    if (requestUser.dataValues.role !== null) {
      returnedUser = await Users.findAll({ where: { id: req.query.id } });
      returnedUsers = await Users.findAll();
      returnedUsers = returnedUsers.concat(returnedUser);
    } else returnedUsers = await Users.findAll({ where: { id: req.query.id } });

    return !returnedUsers
      ? res.status(404).send("Users Not Found")
      : res.send(returnedUsers);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
