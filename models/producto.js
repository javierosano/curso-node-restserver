import { Schema, model } from "mongoose";
// import { Usuario } from "./usuario.js";

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: [true, 'El usuario asociado es obligatorio']
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        requiere: [true, 'La categoría asociada es obligatoria']
    },
    precio: {
        type: Number,
        default: 0
    },
    descripcion: { type: String, default: ".." },
    disponible: { type: Boolean, default: true },
})

ProductoSchema.methods.toJSON = function () {
    const { __v, _id, estado, ...producto } = this.toObject();
    producto.pid = _id;
    return producto;
}

const Producto = model('Producto', ProductoSchema);
export { Producto }