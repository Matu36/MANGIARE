const { Users } = require("../db.js");

module.exports = async (req, res) => {
  try{
    if (!req.body?.email) throw 'No body params'

    const [instance, created] = await Users.findOrCreate({
      where: {email: req.body.email.toLowerCase()},
    });

    res.send(instance);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
