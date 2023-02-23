const { Users } = require("../db.js");

module.exports = async (req, res) => {
  try {
    let user = await Users.findOne({ where: { id: req.body.id } });
    if (!user) return res.status(404).send('No User Found');

    await user.update({...req.body});

    res.send(user);
  }
  catch(error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
