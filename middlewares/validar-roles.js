import { response } from "express"



const esAdminRole = (req, res = response, next) => {


    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere validar el ROL sin validar el token primero'
        })
    }

    const { rol, nombre } = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        })
    }

    next();
}

const tieneRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere validar el ROL sin validar el token primero'
            })
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio resuiere uno de estos roles ${roles}`
            })
        }
        next();
    }
}


export {
    esAdminRole,
    tieneRole
}