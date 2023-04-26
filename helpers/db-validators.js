import { Categoria } from "../models/categoria.js";
import { Role } from "../models/role.js"
import { Usuario } from "../models/usuario.js";
import { Producto } from "../models/producto.js"




const esRolValido = async (rol = '') => {
    const existRole = await Role.findOne({ rol });
    if (!existRole) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos`)
    }
};

const emailExiste = async (correo) => {
    const existCorreo = await Usuario.findOne({ correo });
    if (existCorreo) {
        throw new Error(`El correo ${correo} ya esta registrado en la base de datos`)
    }
};

const existeUsuarioPorID = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El ID: ${id} no existe`)
    }
}

const existeCategoriaPorId = async (id) => {

    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`La categoria: ${id} no existe`)
    }
}
const existeProductoPorId = async (id) => {

    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`La Producto: ${id} no existe`)
    }
}


export {
    esRolValido,
    emailExiste,
    existeUsuarioPorID,
    existeCategoriaPorId,
    existeProductoPorId
}