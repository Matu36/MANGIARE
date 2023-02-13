const mercadopago = require("mercadopago");
const {MERCADOPAGO_KEY} = process.env;

mercadopago.configure({ access_token: MERCADOPAGO_KEY });

module.exports = (req, res) => {
  let preference = {
    items: req.body.orderDetail,
    back_urls: {
      success: "https://localhost:3000/home",
      failure: "",
      pending: "",
    },
    auto_return: "approved",
    binary_mode: true,
  };

  mercadopago.preferences
    .create(preference)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error.message)
      res.status(400).send({ error: error.message });
    });
};