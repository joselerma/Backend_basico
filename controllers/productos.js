const { response, request } = require("express");
const { Producto } = require("../models");

const obtenerProductos = async (req = request, res = response) => {
  try {
    let { limite = 5, desde = 1 } = req.query;
    const query = { estado: true };
    if (isNaN(Number(limite))) limite = 5;
    if (isNaN(Number(desde))) desde = 1;

    const [total, productos] = await Promise.all([
      Producto.countDocuments(query),
      Producto.find(query)
        .populate("usuario", "nombre")
        .populate("categoria", "nombre")
        .skip(desde - 1)
        .limit(Number(limite)),
    ]);
    res.status(200).json({
      total,
      productos,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Error en DB");
  }
};

const obtenerProducto = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findById(id)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre");
    res.json(producto);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error en DB");
  }
};

const crearProducto = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const { categoria } = req.body;
  const usuario = req.usuario._id;
  try {
    const existe = await Producto.findOne({ nombre });
    if (existe) {
      return res
        .status(400)
        .json({ msg: `EL producto ${existe.nombre} ya existe` });
    }

    const data = {
      nombre,
      usuario,
      categoria,
    };
    const producto = new Producto(data);
    producto.save();
    res.status(201).json({ producto });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error en DB" });
  }
};

const actualizarProducto = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const nombre = req.body.nombre.toUpperCase();
    const { categoria } = req.body;
    const existeNombre = await Producto.findOne({ nombre });
    if (existeNombre)
      return res.status(400).json(`El nombre ${nombre} ya existe en la DB`);
    const data = {
      nombre,
      usuario: req.usuario._id,
      categoria,
    };
    const actualizado = await Producto.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.json(actualizado);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error en DB");
  }
};

const eliminarProducto = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const data = {
      estado: false,
      usuario: req.usuario._id,
    };
    const actualizado = await Producto.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.json(actualizado);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error en DB");
  }
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
