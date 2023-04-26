import { Router } from "express";
import { check } from "express-validator";
import { googleSignIn, login } from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const authRoute = Router();


authRoute.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);


authRoute.post('/google', [
    check('id_token', 'id_token de Google es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);



export default authRoute