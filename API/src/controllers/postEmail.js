const transporter = require("../config/mailer");

module.exports = async (req, res) => {
  const { email } = req.body;
  const mailOptions = {
    from: "MANGIAR-E",
    to: email,
    subject: "Enviado desde Nodemailer",
    html: `<h1>Email testing</h1> <p>Este es un email de prueba enviado a <b>${email}</b> usando la librería Nodemailer.</p> <p>No olvides visitar nuestra webs para encontrar las mejores recetas de cocina, con los ingredientes que tengas en tu alacena.</p><a href="https://mangiare.vercel.app/">MANGIARE</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log("Email enviado con exito");
      res.status(200).json(req.body);
    }
  });
};
