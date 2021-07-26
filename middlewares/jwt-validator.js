const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarToken = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token)
    return res.status(401).json({ msg: "No hay token en la peticion" });
  try {
    const { uid } = jwt.verify(token, process.env.JSONWEBTOKEN_SIGN);

    const usuario = await Usuario.findById(uid);
    if (!usuario)
      return res
        .status(401)
        .json({ msg: "Token no valido -no existe usuario" });
    if (!usuario.estado)
      return res
        .status(401)
        .json({ msg: "Token no valido -usuario estado false" });
    req.usuario = usuario;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token invalido" });
  }
};

module.exports = {
  validarToken,
};
