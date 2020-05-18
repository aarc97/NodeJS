const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-type": "application/json" });
    // res.write("Hola a Todos");

    let salida = {
      nombre: "Andris",
      edad: 32,
      url: req.url,
    };

    res.write(JSON.stringify(salida));
    res.end();
  })
  .listen(8080);

console.log("Escuchando el puerto 8080");
