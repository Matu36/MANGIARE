const {Users, Order_details, Orders} = require('../db.js');
const mercadopago = require("mercadopago");
const { merchant_orders } = require('mercadopago');
const {MERCADOPAGO_KEY} = process.env;

mercadopago.configure({ access_token: MERCADOPAGO_KEY });

module.exports = async (req, res) => {
  try{
    if ((!req.body?.cart) || (!req.body?.email) || (!req.body?.address)) throw 'No body params'; // || (!req.body?.userId) 

    const userInstance = await Users.findOne({where: {email: req.body.email}}); // , id: req.body.userId

    if (!userInstance) throw 'Unregistred user';

    let preference = {
      items: req.body.cart.map(({amount, price}) => ({quantity: 1, unit_price: amount * price})),
      back_urls: {
        success: "localhost:3000/orders",
        failure: "localhost:3000/orders"
      },
      auto_return: "approved",
      binary_mode: true,
    };
  
    mercadopago.preferences
      .create(preference)
      .then(async (respPref) => {
        //console.log('30', respPref.response);

        mercadopago.merchant_orders
          .create({preference_id: respPref.response.id})
          .then(async (respMerc) => {

            //console.log('36', respMerc.response);

            const orderInstance = await Orders.create({userId: userInstance.dataValues.id, preferenceId: respMerc.response.preference_id, merchant_orderId: respMerc.response.id});
            // init_point: https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=48965690-ddb3e9dd-7963-474a-adc8-246bde9b0935

            await Order_details.bulkCreate(req.body.cart.map(({id, unit, amount, price}) => ({orderId: orderInstance.dataValues.id, ingredientId: id, unit, amount, price})))
      
            res.send(orderInstance);
          });
      })
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      })
  }
  catch(error) {
    console.log(error);
    res.status(400).send(error);
  }
};


/* Para probar por postman

{"userId": 3,
"email": "email3@email.com",
"address": "direccion de entrega 123",
"cart": [
    { "id": 4, "amount": 1, "unit": "pounds", "price": 10 },
    { "id": 5, "amount": 2, "unit": "cup", "price": 20 },
    { "id": 6, "amount": 3, "unit": "tablespoon", "price": 30 }
    ]
}

*/