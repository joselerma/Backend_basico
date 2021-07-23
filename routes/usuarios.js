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
  validarId,
} = require("../helpers/db-validators");
const {
  fieldsValidator,
  passwordHash,
} = require("../middlewares/field-validator");

const router = require("express").Router();

router.get("/", usuariosGet);
router.post(
  "/",
  [
    check("nombre", "El nombre es requerido").not().isEmpty(),
    // check("password", "El password debe tener al menos 6 letras").isLength({
    //   min: 6,
    // }),
    check("correo", "El correo debe ser un correo valido")
      .custom(validarEmail)
      .isEmail(),
    //check("rol", "El rol debe ser valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol", "El rol debe ser valido").custom(validarRole),
    fieldsValidator,
    passwordHash,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "El id debe ser un id valido").isMongoId().custom(validarId),
    fieldsValidator,
    passwordHash,
  ],
  usuariosPut
);
router.patch("/:id", usuariosPatch);
router.delete(
  "/:id",
  [
    check("id", "El id debe ser un id valido").isMongoId().custom(validarId),
    fieldsValidator,
  ],
  usuariosDelete
);

module.exports = router;
