const {Users, Orders, Order_details, Ingredients} = require('../db.js');

module.exports = async (req, res) => {
  try{
    if ((!req.query?.id) || (!req.query?.email)) throw 'No body params'

    let requestUser = await  Users.findOne({where: {id: req.query.id, email: req.query.email}});

    if (!requestUser) return res.status(403).send('Wrong user');

    let returnedOrders;

    if ((requestUser.dataValues.role !== null) && (req.query?.all === 'true')) returnedOrders = await Orders.findAll({include: [{model: Order_details, include: {model: Ingredients, attributes: ['name']}}, {model: Users, attributes: ['email']}]});
    else returnedOrders = await Orders.findAll({where: {userId: req.query.id}, include: [{model: Order_details, include: {model: Ingredients, attributes: ['name']}}, {model: Users, attributes: ['email']}]});

    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

    return (!returnedOrders)
      ? res.status(404).send('Orders Not Found')
      : res.send(returnedOrders);
  }
  catch(error) {
    console.log(error);
    res.status(500).send(error);
  }
};