const {Reviews, Users} = require('../db.js');

module.exports = async (req, res) => {
  try{
    let requestUser;

    if ((req.body?.id) && (req.body?.email))
      requestUser = await  Users.findOne({where: {id: req.body.id, email: req.body.email, active: true}});

    let returnedReviews;

    if ((requestUser) && (requestUser?.dataValues.role !== null)) returnedReviews = await Reviews.findAll()
    else returnedReviews = await Reviews.findAll({where: {visible: true}});

    return (!returnedReviews)
      ? res.status(404).send('Reviews Not Found')
      : res.send(returnedReviews);
  }
  catch(error) {
    console.log(error);
    res.status(500).send(error);
  }
};