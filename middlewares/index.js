const validarCampos = require("../middlewares/field-validator");
const validarToken = require("../middlewares/jwt-validator");
const validarRol = require("../middlewares/role-validator");

module.exports = {
  ...validarCampos,
  ...validarToken,
  ...validarRol,
};
