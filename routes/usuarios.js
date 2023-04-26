import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { esAdminRole, tieneRole } from "../middlewares/validar-roles.js";
// import { validarCampos, validarJWT } from "../middlewares";

import { usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut } from "../controllers/usuarios.js";
import { emailExiste, esRolValido, existeUsuarioPorID } from "../helpers/db-validators.js";


const userRoutes = Router();


userRoutes.get('/', usuariosGet);

userRoutes.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('rol').custom(esRolValido),
    validarCampos
],
    usuariosPut);


userRoutes.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener mas de 6 letras').isLength({ min: 6 }),
    // check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);

userRoutes.patch('/', usuariosPatch)

userRoutes.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
], usuariosDelete)

export default userRoutes 