const {Ingredients, Orders, Order_details} = require('../db.js');
const stockReserve = require("../helpers/stockReserve");
const Promise = require('bluebird');

module.exports = async (req, res) => {
  try{
    let ingredient = await Ingredients.findOne({where: {id: req.body.id}});

    if (!ingredient) return res.status(404).send('No ingredient found');

    await ingredient.update({...req.body});

    ///////// Resume orders when is possible ///////

    let ordersPaused = (req.body.stock)
    ? await Orders.findAll({where: {status: 1}, include: {model: Order_details, where: {ingredientId: req.body.id}, required: true}, order: ['tsPayment']})
    : []

    await Promise.each(ordersPaused, order => stockReserve(order.id));

    ////////////////////////////////////////////////

    return (!ingredient)
      ? res.status(404).send('No Ingredient Found')
      : res.send(await ingredient.reload());

  }
  catch(error) {
    console.log(error);
    return res.status(500).send(error);
  }
}