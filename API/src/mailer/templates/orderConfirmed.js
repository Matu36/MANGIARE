const orderConfirmed = (props) => {
  let { email } = props;
  let { orderNumber, items, preferenceId } = props.data;

  const { FRONT_URL } = process.env;

  const getTotal = () => {
    let result = 0;
    items.forEach((i) => {
      result = result + i.price * i.amount;
    });
    return result;
  };

  return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Mangiar-e Order Confirmation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            margin: 0;
            padding: 0;
          }
          img {
            max-width: 50%;
          }
          h1 {
            font-size: 24px;
            margin: 0;
            padding: 0;
          }
          table {
            border-collapse: collapse;
            margin: 20px 0;
            width: 100%;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          tbody td:last-child, tbody th:last-child {
            text-align: right;
          }
          tbody td:first-child, tbody th:first-child {
            text-align: left;
          }
          tbody td strong, tbody th strong {
            font-weight: bold;
          }
          p {
            margin: 0 0 20px;
            padding: 0;
          }

          .buttonDiv {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 10px;
          }
          .buttonDiv a {
            text-decoration: none;
            background-color: orange;
            color: #fff;
            padding: 10px;
            border-radius: 10px;
          }
        </style>
      </head>
      <body>
        <img src="https://mangiare.vercel.app/static/media/LandingTitle.e92b7fdb33ac266bc895.png" alt="mangiare logo"/>
        <p><b>Hello ${email},</b></p>
        <p>Thank you for shopping at Mangiar-e! We are pleased to inform you that your order has been created and confirmed successfully.</p>
        <p>Click the button below or go to <a href='${FRONT_URL}/user?id=${orderNumber}'>your user panel</a> to pay it</p>
        <p>Order #: ${orderNumber}</p>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            ${items.map((i) => {
              return `<tr>
                <td>${i.name}</td>
                <td>${i.price}</td>
                <td>${i.amount}</td>
                <td>${i.price * i.amount}</td>
              </tr>`
            })}
            <tr>
              <td></td>
              <td></td>
              <td><strong>Total</strong></td>
              <td><strong>${getTotal()}</strong></td>
            </tr>
          </tbody>
        </table>

        <div class='buttonDiv'>
            <a href='https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}'>GO TO PAY</a>
        </div>

        <p>We are pleased to inform you that your purchase is being prepared for shipment and you will receive another email in the next few minutes with information about the shipment status and an estimated delivery date.</p>
        <p>Thank you for shopping at Mangiar-e. If you have any questions or need assistance, please do not hesitate to contact our customer service team anytime.</p>
        <p>Have a great day!</p>
        <p>Best regards,</p>
        <p>The Mangiar-e team</p>
      </body>
    </html>
    `;
};

module.exports = orderConfirmed;
