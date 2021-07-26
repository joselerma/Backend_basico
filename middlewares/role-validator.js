const { request, response } = require("express");

const validarAdminRol = (req = request, res = response, next) => {
  if (!req.usuario)
    return res.status(500).json({ msg: "No se valido el token" });
  const { rol } = req.usuario;
  if (rol !== "ADMIN_ROLE")
    return res
      .status(401)
      .json({ msg: "La persona no es administrador-No puede hacer esto" });
  next();
};

const validarRoles = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.usuario)
      return res.status(500).json({ msg: "No se valido primero el token" });
    if (!roles.includes(req.usuario.rol))
      return res.status(401).json({
        msg: "El usuario no tiene un rol permitido para realizar esta accion",
      });

    next();
  };
};

module.exports = {
  validarAdminRol,
  validarRoles,
};
