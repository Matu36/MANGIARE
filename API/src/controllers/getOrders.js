const {Users, Orders} = require('../db.js');

module.exports = async (req, res) => {
  try{
    if ((!req.body?.id) || (!req.body?.email)) throw 'No body params or inactive user'

    let requestUser = await  Users.findOne({where: {id: req.body.id, email: req.body.email, active: true}});

    if (!requestUser) return res.status(403).send('Wrong user');

    let returnedOrders;

    if (requestUser.dataValues.role !== null) returnedOrders = await Orders.findAll({include: 'Order_details'});
    else returnedOrders = await Orders.findAll({where: {id: req.body.id}, include: 'Order_details'});

    return (!returnedOrders)
      ? res.status(404).send('Orders Not Found')
      : res.send(returnedOrders);
  }
  catch(error) {
    console.log(error);
    res.status(500).send(error);
  }
};