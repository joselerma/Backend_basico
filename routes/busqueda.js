const { busqueda } = require("../controllers/busqueda");

const router = require("express").Router();

router.get("/:coleccion/:termino", busqueda);

module.exports = router;
