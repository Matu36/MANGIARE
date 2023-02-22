const {Orders} = require('../db.js');

module.exports = async (req, res) => {
  try{
    if (req.body?.status === 'approved') await (await Orders.findOne({where: {status: 0, preferenceId: req.body?.preference_id}})).update({status: 1, tsPayment: new Date()});

    res.send();
  }
  catch(error) {
    console.log(error);
    res.status(500).send(error);
  }

  /*
  if ((!req.body?.userId) || (!req.body?.email) || (!req.body?.orderId)) throw 'No body params'

  let requestUser = await  Users.findOne({where: {id: req.body.userId, email: req.body.email}});
  if (!requestUser) return res.status(403).send('Wrong user');

  let returnedOrders = await requestUser.getOrders({where: {id: req.body.orderId, status: 0}, include: 'Order_details'});
  if (!returnedOrders.length) return res.status(404).send('Order not found');

  //return res.send(returnedOrders[0].Order_details.map(({amount, price}) => ({quantity: amount, unit_price: price})));
  */


};