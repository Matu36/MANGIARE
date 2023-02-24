const {Users, Orders} = require('../db.js');

module.exports = async (req, res) => {
  try{
    if ((!req.query?.id) || (!req.query?.email)) throw 'No body params'

    let requestUser = await  Users.findOne({where: {id: req.query.id, email: req.query.email}});

    if (!requestUser) return res.status(403).send('Wrong user');

    let returnedOrders;

    if ((requestUser.dataValues.role !== null) && (req.query?.all === 'true')) returnedOrders = await Orders.findAll({include: 'Order_details'});
    else returnedOrders = await Orders.findAll({where: {userId: req.query.id}, include: 'Order_details'});

    return (!returnedOrders)
      ? res.status(404).send('Orders Not Found')
      : res.send(returnedOrders);
  }
  catch(error) {
    console.log(error);
    res.status(500).send(error);
  }
};