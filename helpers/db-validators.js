const Role = require("../models/role");
const { Usuario, Categoria, Producto } = require("../models");

const validarRole = async (rol = "") => {
  const existeRole = await Role.findOne({ rol });
  if (!existeRole) throw new Error(`El rol ${rol} no se encuentra en la DB`);
};

const validarEmail = async (correo = "") => {
  const emailExiste = await Usuario.findOne({ correo });
  if (emailExiste) {
    throw new Error(`El email ${correo} ya esta registrado`);
  }
};

const validarIdUsuario = async (id) => {
  const existeId = await Usuario.findOne({ _id: id, estado: true });
  if (!existeId) {
    throw new Error(`No existe un usuario con el id ${id}`);
  }
};

const validarIdCategoria = async (id) => {
  const existeId = await Categoria.findOne({ _id: id, estado: true });
  if (!existeId) {
    throw new Error(`No existe una categoria con el id ${id}`);
  }
};

const validarIdProducto = async (id) => {
  const existeId = await Producto.findOne({ _id: id, estado: true });
  if (!existeId) {
    throw new Error(`No existe un producto con el id ${id}`);
  }
};

module.exports = {
  validarRole,
  validarEmail,
  validarIdUsuario,
  validarIdCategoria,
  validarIdProducto,
};
