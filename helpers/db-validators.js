import { Role } from "../models/role.js"
import { Usuario } from "../models/usuario.js";




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


export {
    esRolValido,
    emailExiste,
    existeUsuarioPorID
}