const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/usuarios");
const {
  validarRole,
  validarEmail,
  validarIdUsuario,
} = require("../helpers/db-validators");

const {
  fieldsValidator,
  passwordHash,
  validarToken,
  validarAdminRol,
  validarRoles,
} = require("../middlewares");

const router = require("express").Router();

router.get("/", usuariosGet);
router.post(
  "/",
  [
    check("nombre", "El nombre es requerido").not().isEmpty(),
    // check("password", "El password debe tener al menos 6 letras").isLength({
    //   min: 6,
    // }),Custumize passwordHash para que al mismo tiempo hashe la password
    check("correo", "El correo debe ser un correo valido")
      .custom(validarEmail)
      .isEmail(),
    //check("rol", "El rol debe ser valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    //hicimos el cambio para chequear contra base de datos y no en un string
    check("rol", "El rol debe ser valido").custom(validarRole),
    fieldsValidator,
    passwordHash,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "El id debe ser un id valido")
      .isMongoId()
      .custom(validarIdUsuario),
    fieldsValidator,
    passwordHash,
  ],
  usuariosPut
);
router.patch("/:id", usuariosPatch);
router.delete(
  "/:id",
  [
    validarToken,
    // validarAdminRol,Este middleware solo permite el rol de admininistrador
    validarRoles("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "El id debe ser un id valido")
      .isMongoId()
      .custom(validarIdUsuario),
    fieldsValidator,
  ],
  usuariosDelete
);

module.exports = router;
