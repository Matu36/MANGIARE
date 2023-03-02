//ANTES DE MODIFICAR PREGUNTAR A YAMIL!!!!
//ANTES DE MODIFICAR PREGUNTAR A YAMIL!!!!
//ANTES DE MODIFICAR PREGUNTAR A YAMIL!!!!

const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const transporter = require("./src/mailer/mailer");
const modelsMock = require("./src/helpers/modelsMock.js");

conn
  .sync({
    //force: true,
    //alter: true
  })
  .then(async () => {
    console.log("Database:      ✅");
    server.listen(3001, () => {
      console.log(
        "Back server:   ✅  -  ( port: 3001 )"
      ); // eslint-disable-line no-console
    });
  })
  .then(async () => {
    await transporter.verify().then(() => {
      console.log("Email service: ✅");
    });
  })

  // Inserts de prueba en DB
  //.then(() => modelsMock(1000)) // nro Api Regs --- 0: ONLY LOCAL

  .catch((err) => console.log(err));
