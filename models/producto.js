const { model, Schema } = require("mongoose");

const ProductoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido"],
    unique: true,
  },
  estado: {
    type: Boolean,
    required: true,
    default: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  descripcion: {
    type: String,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
});

ProductoSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

module.exports = model("Producto", ProductoSchema);
