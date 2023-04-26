import { Schema, model } from "mongoose";

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        require: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }
})

CategoriaSchema.methods.toJSON = function () {
    const { __v, _id, estado, ...categoria } = this.toObject();
    categoria.cid = _id;
    return categoria;
}

const Categoria = model('Categoria', CategoriaSchema);
export { Categoria }