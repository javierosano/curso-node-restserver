import { request, response } from "express";
import JsonWebToken from "jsonwebtoken";

import { Usuario } from "../models/usuario.js";

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { uid } = JsonWebToken.verify(token, process.env.SECRETORPRIVATEKEY)
        req.uid = uid


        //leer el usuario del uid
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token - Usuario inexistente BD'
            })
        }


        // verificar el estado del usuario con ese uid
        if (!usuario.estado) {
            return res.status(401).json({
                msg: `Token - Usuario ${usuario.nombre} deshabilitado BD`
            })
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }


}


export { validarJWT }