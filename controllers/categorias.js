const { response, request } = require("express");
const { Categoria } = require("../models");

const obtenerCategorias = async (req = request, res = response) => {
  try {
    let { limite = 5, desde = 1 } = req.query;
    const query = { estado: true };
    if (isNaN(Number(limite))) limite = 5;
    if (isNaN(Number(desde))) desde = 1;

    const [total, categorias] = await Promise.all([
      Categoria.countDocuments(query),
      Categoria.find(query)
        .populate("usuario", "nombre")
        .skip(desde - 1)
        .limit(Number(limite)),
    ]);
    res.status(200).json({
      total,
      categorias,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Error en DB");
  }
};

const obtenerCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findById(id).populate(
      "usuario",
      "nombre"
    );
    res.json(categoria);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error en DB");
  }
};

const crearCategoría = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const usuario = req.usuario._id;
  try {
    const existe = await Categoria.findOne({ nombre });
    if (existe) {
      return res
        .status(400)
        .json({ msg: `La categoría ${existe.nombre} ya existe` });
    }

    const data = {
      nombre,
      usuario,
    };
    const categoria = new Categoria(data);
    categoria.save();
    res.status(201).json({ categoria });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error en DB" });
  }
};

const actualizarCategoria = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const nombre = req.body.toUpperCase();
    const existeNombre = await Categoria.findOne({ nombre });
    if (existeNombre)
      return res.status(400).json(`El nombre ${nombre} ya existe en la DB`);
    const data = {
      nombre,
      usuario: req.usuario._id,
    };
    const actualizada = await Categoria.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.json(actualizada);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error en DB");
  }
};

const eliminarCategoria = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const data = {
      estado: false,
      usuario: req.usuario._id,
    };
    const actualizada = await Categoria.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.json(actualizada);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error en DB");
  }
};

module.exports = {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoría,
  actualizarCategoria,
  eliminarCategoria,
};
