import { response } from "express"
import { Usuario } from "../models/usuario.js";
import bcryptjs from "bcryptjs"
import { generarJWT } from "../helpers/generar-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";

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

const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {

        const { nombre, img, correo } = await googleVerify(id_token);
        // console.log(googleUser);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: 'x',
                // rol: 'USER_ROLE',
                img,
                google: true
            }

            usuario = new Usuario(data);
            try {
                await usuario.save();
            } catch (error) {
                console.log('este es el error:', error);
            }
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, Usuario bloqueado'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })




    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token google no se puedo verificar'
        })
    }
}


export {
    login,
    googleSignIn
}