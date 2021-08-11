const router = require("express").Router();
const { check } = require("express-validator");
const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productos");
const {
  validarIdProducto,
  validarIdCategoria,
} = require("../helpers/db-validators");
const {
  fieldsValidator,
  validarToken,
  validarAdminRol,
} = require("../middlewares");

router.get("/", obtenerProductos);

router.get(
  "/:id",
  [
    check("id", "El id debe ser un id valido")
      .isMongoId()
      .custom(validarIdProducto),
    fieldsValidator,
  ],
  obtenerProducto
);
router.post(
  "/",
  [
    validarToken,
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("categoria", "El id de la categoria debe ser un id valido")
      .isMongoId()
      .custom(validarIdCategoria),
    fieldsValidator,
  ],
  crearProducto
);
router.put(
  "/:id",
  [
    validarToken,
    check("id", "El id debe ser un id valido")
      .isMongoId()
      .custom(validarIdProducto),
    check("categoria", "El id de la categoria debe ser un id valido")
      .isMongoId()
      .custom(validarIdCategoria),
    check("nombre", "El nombre es requerido").not().isEmpty(),
    fieldsValidator,
  ],
  actualizarProducto
);

router.delete(
  "/:id",
  [
    validarToken,
    validarAdminRol,
    check("id", "El id debe ser un id valido")
      .isMongoId()
      .custom(validarIdProducto),
    fieldsValidator,
  ],
  eliminarProducto
);

module.exports = router;
