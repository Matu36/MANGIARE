const paymentReceived = (props) => {
  let { email } = props;
  let { orderNumber } = props.data;

  const { FRONT_URL } = process.env;

  return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Mangiar-e Payment Received</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            color: #333333;
            margin: 0;
            padding: 0;
          }
          img {
            max-width: 50%;
          }
          table {
            border-collapse: collapse;
            margin: 20px 0;
            width: 100%;
          }
          th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
          }
          tbody td:last-child, tbody th:last-child {
            text-align: right;
          }
          tbody td:first-child {
            text-transform: capitalize;
          }
          strong {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <img src="https://mangiare.vercel.app/static/media/LandingTitle.e92b7fdb33ac266bc895.png" alt="mangiare logo"/>
        <p><b>Hello ${email},</b></p>
        <p>We are pleased to inform you that we have received your payment for the order #: ${orderNumber}</p>
        <p>Your purchase is being prepared for shipment and you will receive another email in the next few minutes with information about the shipment status and an estimated delivery date.</p>
        <p>Thank you for shopping at Mangiar-e. If you have any questions or need assistance, please do not hesitate to contact our customer service team anytime.</p>
        <p>Don't forget to continue visiting our app <a href='${FRONT_URL}'>MANGIAR-E</a> to get the best recipes!</p>
        <p>Best regards,</p>
        <p>The Mangiar-e team</p>
      </body>
    </html>    
      `;
};

module.exports = paymentReceived;
