const { response, request } = require("express");
const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  try {
    let { limite = 5, desde = 1 } = req.query;
    const query = { estado: true };
    if (isNaN(Number(limite))) limite = 5;
    if (isNaN(Number(desde))) desde = 1;

    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
        .skip(desde - 1)
        .limit(Number(limite)),
    ]);
    res.status(200).json({
      total,
      usuarios,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const usuariosPost = async (req = request, res = response) => {
  try {
    const { nombre, correo, rol, google, password } = req.body;

    const usuario = new Usuario({
      nombre,
      correo,
      rol,
      google,
      password,
    });
    await usuario.save();
    res.status(201).json({
      peticion: "POST",
      usuario,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const usuariosPut = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { _id, correo, ...resto } = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.status(201).json({
      peticion: "PUT",
      msg: `Campo con id ${id}  actualizado`,
      usuario,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const usuariosPatch = (req = request, res = response) => {
  const { id } = req.params;
  res.status(201).json({
    peticion: "PATCH",
    msg: `Campo con id ${id}  actualizado`,
    params: req.query,
  });
};

const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const usuarioAutenticado = req.usuario;
  //const usuario= Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  res.status(200).json({
    usuario,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
};
