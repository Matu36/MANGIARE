const {Users, Order_details, Orders} = require('../db.js');

module.exports = async (req, res) => {
  try{
    if ((!req.body?.cart) || (!req.body?.user)) throw 'No body params'

    const [userInstance, created] = await Users.findOrCreate({
      where: {email: req.body.user.toLowerCase()},
      defaults: {username: 'algo', password: 'fruta', email: req.body.user.toLowerCase()}
    });

    const orderInstance = await Orders.create({userId: userInstance.dataValues.id});

    await Order_details.bulkCreate(req.body.cart.map(({id, unit, amount}) => ({orderId: orderInstance.dataValues.id, ingredientId: id, unit, amount})))
    
    res.send({user: userInstance.dataValues, orderId: orderInstance.dataValues.id, orderDetail: req.body.cart.map(({id, name, amount, unit, price}) => ({title: name, description: amount + ' ' + unit, quantity: 1, currency_id: "$", unit_price: price * amount}))});
  }
  catch(error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};