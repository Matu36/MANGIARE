const transporter = require("../mailer/mailer");

//                   ------------------ Parametros que recibe la función ------------------
//
// to = es el email del destinatario
// subject = es el asunto del correo electronico
// html = contenido del email.          ❗🛑 Solo admite formato texto o html 🛑❗

// Si no se proporciona un contenido en html, se enviará un email de testing

const sendEmail = (to, subject, html) => {
  console.log("Sending email...");
  let emailOptions = {
    from: "MANGIAR-E",
    to,
    subject,
    html:
      html ||
      `<h1>Email testing</h1> <p>Este es un email de prueba enviado a <b>${to}</b> usando la librería Nodemailer.</p> <p>No olvides visitar nuestra webs para encontrar las mejores recetas de cocina, con los ingredientes que tengas en tu alacena.</p><a href="https://mangiare.vercel.app/">MANGIARE</a>`,
  };

  transporter.sendMail(emailOptions, (error, info) => {
    if (error) {
      console.log("Email error: ", error.message);
    } else {
      console.log("Email sent succesfully 📧");
    }
  });
};

module.exports = sendEmail;
