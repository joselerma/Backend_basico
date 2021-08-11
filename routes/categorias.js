const router = require("express").Router();
const { check } = require("express-validator");
const {
  crearCategoría,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  eliminarCategoria,
} = require("../controllers/categorias");
const { validarIdCategoria } = require("../helpers/db-validators");
const {
  fieldsValidator,
  validarToken,
  validarAdminRol,
} = require("../middlewares");

router.get("/", obtenerCategorias);

router.get(
  "/:id",
  [
    check("id", "El id debe ser un id valido")
      .isMongoId()
      .custom(validarIdCategoria),
    fieldsValidator,
  ],
  obtenerCategoria
);
router.post(
  "/",
  [
    validarToken,
    check("nombre", "El nombre es requerido").not().isEmpty(),
    fieldsValidator,
  ],
  crearCategoría
);
router.put(
  "/:id",
  [
    validarToken,
    check("id", "El id debe ser un id valido")
      .isMongoId()
      .custom(validarIdCategoria),
    check("nombre", "El nombre es requerido").not().isEmpty(),
    fieldsValidator,
  ],
  actualizarCategoria
);

router.delete(
  "/:id",
  [
    validarToken,
    validarAdminRol,
    check("id", "El id debe ser un id valido")
      .isMongoId()
      .custom(validarIdCategoria),
    fieldsValidator,
  ],
  eliminarCategoria
);

module.exports = router;
