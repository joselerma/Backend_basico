const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { grabarToken } = require("../helpers/grabarJsonWebToken");

const login = async (req = request, res = response) => {
  try {
    const { correo, password } = req.body;
    const usuario = await Usuario.findOne({ correo, estado: true });
    if (!usuario) {
      return res.status(400).json("Password o correo incorrectos - correo");
    }
    const contrasena = bcryptjs.compareSync(password, usuario.password);
    if (!contrasena) {
      return res.status(400).json("Password o correo incorrectos - password");
    }

    const token = await grabarToken(usuario.id);
    res.json({ usuario, token });
  } catch (err) {
    console.log(err);
    res.status(500).json("Error en el servidor");
  }
};

module.exports = {
  login,
};
