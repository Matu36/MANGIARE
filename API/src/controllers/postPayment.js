const { Orders } = require("../db.js");
const stockReserve = require("../helpers/stockReserve");
const sendEmailWithTemplate = require("../mailer/sendEmailWithTemplate");

module.exports = async (req, res) => {
  try {
    let orderInstance;

    if (req.body?.status === "approved")
      orderInstance = await Orders.findOne({
        where: { status: 0, preferenceId: req.body?.preference_id },
      });

    if (!orderInstance) return res.status(404).send("No order");

    await orderInstance.update({ status: 1, tsPayment: new Date() });

    sendEmailWithTemplate(req.body.email, "paymentReceived", {
      orderNumber: orderInstance.id,
    });

    await stockReserve(orderInstance.id);

    res.send(orderInstance);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
