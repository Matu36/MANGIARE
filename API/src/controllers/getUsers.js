const {Users} = require('../db.js');

module.exports = async (req, res) => {
  try{
    if ((!req.body?.id) || (!req.body?.email)) throw 'No body params or inactive user'

    let requestUser = await  Users.findOne({where: {id: req.body.id, email: req.body.email, active: true}});

    if (!requestUser) return res.status(403).send('Wrong user');

    let returnedUsers;

    if (requestUser.dataValues.role !== null) returnedUsers = await Users.findAll();
    else returnedUsers = await Users.findAll({where: {id: req.body.id}});

    return (!returnedUsers)
      ? res.status(404).send('Users Not Found')
      : res.send(returnedUsers);
  }
  catch(error) {
    console.log(error);
    res.status(500).send(error);
  }
};