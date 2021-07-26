const router = require("express").Router();
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { fieldsValidator } = require("../middlewares/field-validator");

router.post(
  "/login",
  [
    check("correo", "El correo debe ser un correo válido").isEmail(),
    check("password", "El password es requerido").not().isEmpty(),
    fieldsValidator,
  ],
  login
);

module.exports = router;
