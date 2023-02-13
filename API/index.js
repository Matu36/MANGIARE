//ANTES DE MODIFICAR PREGUNTAR A YAMIL!!!!
//ANTES DE MODIFICAR PREGUNTAR A YAMIL!!!!
//ANTES DE MODIFICAR PREGUNTAR A YAMIL!!!!

const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const modelsMock = require("./src/helpers/modelsMock.js");

conn
  .sync({
     //force: true,
      //alter: true
  })
  .then(async () => {
    console.log("DB sincronized OK!");
    server.listen(process.env.PORT || 3001 , () => {
      console.log("Back server listening at" , process.env.PORT); // eslint-disable-line no-console
    });
  })

  // Inserts de prueba en DB
   //.then(() => modelsMock(1000)) // nro Api Regs --- 0: ONLY LOCAL

  .catch((err) => console.log(err));
