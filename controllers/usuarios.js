const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  res.status(200).json({
    peticion: "GET",
  });
};

const usuariosPost = (req = request, res = response) => {
  res.status(201).json({
    peticion: "POST",
  });
};

const usuariosPut = (req = request, res = response) => {
  const { id } = req.params;
  res.status(201).json({
    peticion: "PUT",
    msg: `Campo con id ${id}  actualizado`,
    params: req.query,
  });
};

const usuariosPatch = (req = request, res = response) => {
  const { id } = req.params;
  res.status(201).json({
    peticion: "PATCH",
    msg: `Campo con id ${id}  actualizado`,
    params: req.query,
  });
};

const usuariosDelete = (req = request, res = response) => {
  const { id } = req.params;
  res.status(200).json({
    peticion: "DELETE",
    msg: `El campo con id ${id} eliminado`,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
};
