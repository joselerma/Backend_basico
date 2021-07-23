const Role = require("../models/role");
const Usuario = require("../models/usuario");

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

const validarId = async (id) => {
  const existeId = await Usuario.findById(id);
  if (!existeId) {
    throw new Error(`No existe un usuario con el id ${id}`);
  }
};

module.exports = {
  validarRole,
  validarEmail,
  validarId,
};
