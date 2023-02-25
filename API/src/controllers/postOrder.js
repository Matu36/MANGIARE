const { Users, Order_details, Orders } = require("../db.js");
const mercadopago = require("mercadopago");
const { merchant_orders } = require("mercadopago");
const { MERCADOPAGO_KEY, FRONT_URL } = process.env;

mercadopago.configure({ access_token: MERCADOPAGO_KEY });

module.exports = async (req, res) => {
  try {
    if (!req.body?.cart || !req.body?.email || !req.body?.address)
      throw "No body params";

    const userInstance = await Users.findOne({
      where: { email: req.body.email },
    });

    if (!userInstance) throw "Unregistred user";

    let preference = {
      items: req.body.cart.map(({ amount, price }) => ({
        quantity: 1,
        unit_price: amount * price,
      })),
      back_urls: {

        success: `${FRONT_URL}/user`,
        success: `${FRONT_URL}/user`,

      },
      auto_return: "approved",
      binary_mode: true,
    };

    mercadopago.preferences
      .create(preference)
      .then(async (respPref) => {
        mercadopago.merchant_orders
          .create({ preference_id: respPref.response.id })
          .then(async (respMerc) => {
            const orderInstance = await Orders.create({
              userId: userInstance.dataValues.id,
              preferenceId: respMerc.response.preference_id,
              merchant_orderId: respMerc.response.id,
            });
            // init_point: https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=48965690-ddb3e9dd-7963-474a-adc8-246bde9b0935

            await Order_details.bulkCreate(
              req.body.cart.map(({ id, unit, amount, price }) => ({
                orderId: orderInstance.dataValues.id,
                ingredientId: id,
                unit,
                amount,
                price,
              }))
            );

            res.send(orderInstance);
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};