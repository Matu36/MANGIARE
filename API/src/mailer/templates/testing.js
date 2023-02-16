const testing = (props) => {
  return `<h1>Probando las nuevas <i>templates</i></h1>
  <h2>Mensaje enviado a ${props.email}</h2>
    <p>Este es un <b>mensaje de prueba</b> para comprobar el funcionamiento de las nuevas templates para el envío de emails automatizados.
    </p>
    <p>No olvides visitar nuestro sitio <a href="https://mangiare.vercel.app/">MANGIARE</a> en donde encontrarás las mejores
        recetas</p>`;
};

module.exports = testing;
