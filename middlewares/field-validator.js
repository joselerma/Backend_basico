const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

const fieldsValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const passwordHash = (req, res, next) => {
  if (req.body.password) {
    const password = req.body.password;
    if (password.length < 6)
      return res
        .status(400)
        .json("La contraseña es muy corta debe tener al menos 6 caracteres");
    const salt = bcryptjs.genSaltSync();
    req.body.password = bcryptjs.hashSync(password, salt);
  }
  next();
};
module.exports = {
  fieldsValidator,
  passwordHash,
};
