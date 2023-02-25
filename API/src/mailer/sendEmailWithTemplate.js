const transporter = require("../mailer/mailer");
const testing = require("./templates/testing");
const newUser = require("./templates/newUser");
const orderStatus = require("./templates/orderStatus");
const orderConfirmed = require("./templates/orderConfirmed");
const paymentReceived = require("./templates/paymentReceived");

//                   ------------------ Parametros que recibe la función ------------------
//
// to = es el email del destinatario
// template = plantilla modelo para dar formato al body del email.
// 💡👉🏻 Seleccionar una de las plantillas predefinidas que se encuentran en la carpeta "./templates/"

// Ambos parametros son obligatorios si no el email no se enviará.

const sendEmailWithTemplate = (to, template, data) => {
  console.log("Sending email...");
  let emailOptions;

  switch (template) {
    case "newUser":
      emailOptions = {
        from: "MANGIAR-E",
        to,
        subject: "Welcome to Mangiare - Bring your ingredients to life!",
        html: newUser({ email: to }),
      };
      break;

    case "orderStatus":
      emailOptions = {
        from: "MANGIAR-E",
        to,
        subject: "Update on your Mangiar-e purchase status",
        html: orderStatus({ email: to, data }),
      };
      break;

    case "orderConfirmed":
      emailOptions = {
        from: "MANGIAR-E",
        to,
        subject: "Your Mangiar-e Order Has Been Confirmed",
        html: orderConfirmed({ email: to, data }),
      };
      break;

    case "paymentReceived":
      emailOptions = {
        from: "MANGIAR-E",
        to,
        subject: "Payment Received - Thank you for your purchase at Mangiar-e",
        html: paymentReceived({email: to, data}),
      };
      break;

    default:
      emailOptions = {
        from: "MANGIAR-E",
        to,
        subject: "Testing email using templates",
        html: testing({ email: to }),
      };
      break;
  }

  transporter.sendMail(emailOptions, (error, info) => {
    if (error) {
      console.log("Email error: ", error.message);
    } else {
      console.log("Email sent succesfully 📧");
    }
  });
};

module.exports = sendEmailWithTemplate;
