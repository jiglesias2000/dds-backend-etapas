// best practices
// https://blog.heroku.com/best-practices-nodejs-errors

// manejo de errores
const fs = require("fs/promises");
const errorHandler = async function (err, req, res, next) {
  // logueamos el error en un archivo para luego consultarlo.
  console.log(err.stack);

  dato = new Date().toLocaleString() + "\n" + err.stack + "\n" + "\n";
  // fs usa ruta siempre desde root 
  await fs.writeFile("./log.txt", dato, { flag: "a" });
  //const logFile = fs.readFile("log.txt",'utf-8');

  //enviamos al usuario un mensaje apropiado, sin dar detalles del error
  res
    .status(500)
    .json( {
      mensaje: "Actualmente tenemos inconvenientes con procesar su solicitud, intente nuevamente mas tarde!"
    }
    );
    }

// captura toda las peticiones que no han sido capturadas anteriormente
const _404Handler = function (req, res, next) {
    res.status(404).send("No encontrada!");
}

process.on('uncaughtException', err => {
  // si se cae el sevidor, logueamos la causa para poder analizarlo y corregirlo a posterior.
  console.log(`Uncaught Exception: ${err.message}`)
  process.exit(1)   
  // el servidor se cae, tendria que haber otra app monitoriando el servidor y levantandolo nuevamente, ej pm2 (Process Manager 2)

})


module.exports = {errorHandler, _404Handler}