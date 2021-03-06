const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");

//usando template engine
server.set('view engine', 'ejs');

//Mudar Localizacao da pasta views
server.set('views', path.join(__dirname, 'views'));

//habilitar arquivos staticos
server.use(express.static("public"));

//usando req.body
server.use(express.urlencoded({ extended: true }))

//rotas
server.use(routes);



server.listen(3000, () => console.log("rodando"));