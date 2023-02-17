/* 

        -------------------- Como usar la plantilla orderStatus --------------------

Para enviar un email con la plantilla utilizar la función sendEmailWithTemplate con TRES parametros:

- email del destinatario.
- "orderStatus"   👈🏻 Para indicar a la funcion la plantilla a utilizar
- objeto "data"   👈🏻 Objeto que incluye la informacion del estado de la orden.

El objeto data debe contener los TRES valores obligatoriamente:
- orderNumber     👈🏻 Es el número de orden generado al hacer el checkout
- orderDate       👈🏻 Es la fecha en que se realizó la compra
- orderStatus     👈🏻 Es el estado en que se encuentra la compra [pendiente, pagado, en camino, rechazado, etc]


Ejemplo de uso de la plantilla con la funcion sendEmailWithTemplate:

sendEmailWithTemplate("mangiar-e@outlook.com", "orderStatus", {orderNumber: 2, orderDate: "14/08/2023", orderStatus: "Rejected"})

*/

const orderStatus = (props) => {
  let { email } = props;
  let { orderNumber, orderDate, orderStatus } = props.data;

  return `<html>
  <head>
    <title>Update on your Mangiar-e purchase status</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.5;
        padding: 4rem;
        box-sizing: border-box;
      }
      img {
        max-width: 50%;
      }
      h1, h2, h3 {
        font-weight: bold;
      }
      h1 {
        font-size: 2.5em;
        color: #F77F00;
        margin-bottom: 0.5em;
      }
      p {
        margin-bottom: 1.5em;
      }
      a {
        color: #F77F00;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <img src="https://mangiare.vercel.app/static/media/LandingTitle.e92b7fdb33ac266bc895.png" alt="mangiare logo"/>
    <h1>Update on your Mangiar-e purchase status</h1>
    <p><b>Dear ${email},</b></p>
    <p>We wanted to let you know that the status of your purchase from Mangiar-e has been updated. Below are the details:</p>
    <ul>
      <li><strong>Order number:</strong> ${orderNumber}</li>
      <li><strong>Order date:</strong> ${orderDate}</li>
      <li><strong>Order status:</strong> ${orderStatus}</li>
    </ul>
    <p>If you have any questions or concerns about your order, please don't hesitate to <a href="mailto:mangiare.email@gmail.com">contact our customer service</a>. We're here to assist you with anything you need.</p>
    <p>Thank you for choosing Mangiar-e for your purchase!</p>
    <p>Best regards,</p>
    <br>
    <p>Mangiar-e Team</p>
  </body>
</html>`;
};

module.exports = orderStatus;
