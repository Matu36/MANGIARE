const mercadopago = require("mercadopago");
const {Order_details, Orders} = require('../db');
const {MERCADOPAGO_KEY} = process.env;

mercadopago.configure({ access_token: MERCADOPAGO_KEY });

module.exports = async (req, res) => {

  if ((!req.body.userId) || (!req.body.orderId)) throw 'No body params';

  let orderInstance = await Orders.findOne({where: {userId: req.body.userId, id: req.body.orderId}});

  if (!orderInstance) throw 'No orders with params provided';

  const orderDetails = await orderInstance.getOrder_details();

/*    {
        "orderId": 3,
        "ingredientId": 1,
        "amount": 2,
        "unit": "pounds",
        "price": 4.44
    },
*/

  const preference = {
    items: orderDetails.map(({amount, price}) => ({quantity: 1, unit_price: amount * price})),
    back_urls: {
      success: "localhost:3000/home",
      failure: "",
      pending: "",
    },
    auto_return: "approved",
    binary_mode: true,
  };

  mercadopago.preferences
    .create(preference)
    .then((response) => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error.message)
      res.status(400).send({ error: error.message });
    });
};