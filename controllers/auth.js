import { response } from "express"
import { Usuario } from "../models/usuario.js";
import bcryptjs from "bcryptjs"
import { generarJWT } from "../helpers/generar-jwt.js";

const login = async (req, res = response) => {

    const { correo, password } = req.body;



    try {
        //Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario/Contraseña no son correctos - correo'
            })
        }
        //Verificar el estado del usuario (Activo)
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario/Contraseña no son correctos - estado = false'
            })
        }
        //Verificar contraseña

        const validContrasena = bcryptjs.compareSync(password, usuario.password);
        if (!validContrasena) {
            return res.status(400).json({
                msg: 'Usuario/Contraseña no son correctos - contrasena'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}


export { login }