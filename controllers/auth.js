const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { grabarToken } = require("../helpers/grabarJsonWebToken");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;
  try {
    const { correo, nombre, img } = await googleVerify(id_token);
    let usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      const data = {
        nombre,
        correo,
        img,
        password: ":P",
        google: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    if (!usuario.estado)
      return res.status(401).json({ msg: "Usuario no permitido" });

    const token = await grabarToken(usuario.id);

    res.json({ usuario, token });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "Token de google invalido",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
