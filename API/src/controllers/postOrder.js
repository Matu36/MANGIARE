const {Users, Order_details, Orders} = require('../db.js');

module.exports = async (req, res) => {
  try{
    if ((!req.body?.cart) || (!req.body?.email) || (!req.body?.address)) throw 'No body params'; // || (!req.body?.userId)

    const userInstance = await Users.findOne({where: {email: req.body.email}}); // , id: req.body.userId

    if (!userInstance) throw 'Unregistred user';

    const orderInstance = await Orders.create({userId: userInstance.dataValues.id});

    await Order_details.bulkCreate(req.body.cart.map(({id, unit, amount, price}) => ({orderId: orderInstance.dataValues.id, ingredientId: id, unit, amount, price})))
    
    res.send({user: userInstance.dataValues, orderId: orderInstance.dataValues.id, orderDetail: req.body.cart.map(({id, name, amount, unit, price}) => ({title: name, description: amount + ' ' + unit, quantity: 1, currency_id: "$", unit_price: price * amount}))});
  }
  catch(error) {
    console.log(error);
    res.status(500).send(error);
  }
};