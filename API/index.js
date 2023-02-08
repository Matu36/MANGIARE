const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const modelsMock = require('./src/helpers/modelsMock.js');

conn.sync(
  {
    force: true
//    alter: true
  }
)
.then(async () => {
  console.log('DB sincronized OK!');
  server.listen(3001, () => {
    console.log('Back server listening at 3001'); // eslint-disable-line no-console
  });
})

// Inserts de prueba en DB
.then(() => modelsMock(100)) // nro Api Regs --- 0: ONLY LOCAL

.catch(err => console.log(err));