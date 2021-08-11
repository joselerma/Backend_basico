require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.path = {
      auth: "/api/auth",
      categorias: "/api/categorias",
      usuarios: "/api/usuarios",
      productos: "/api/productos",
      busqueda: "/api/buscar",
    };
    this.conectarDB();
    this.middlewares();
    this.routes();
  }
  async conectarDB() {
    await dbConnection();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.static("public"));
    this.app.use(express.json());
  }
  routes() {
    this.app.use(this.path.auth, require("../routes/auth"));
    this.app.use(this.path.categorias, require("../routes/categorias"));
    this.app.use(this.path.usuarios, require("../routes/usuarios"));
    this.app.use(this.path.productos, require("../routes/productos"));
    this.app.use(this.path.busqueda, require("../routes/busqueda"));
  }
  listen() {
    this.app.listen(this.port, () =>
      console.log("Escuchando en el puerto ", this.port)
    );
  }
}

module.exports = Server;
