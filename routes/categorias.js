import { Router, response } from "express";
import { check } from "express-validator";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { crearCategoria, obtenerCategoria, obtenerCategorias, actualizarCategoria, borrarCategoria } from "../controllers/categorias.js";
import { existeCategoriaPorId } from "../helpers/db-validators.js";
import { esAdminRole } from "../middlewares/validar-roles.js";

const categoriaRoute = Router();


//obtener todas las categorias - publico
categoriaRoute.get('/', obtenerCategorias)

//obtener categoria por Id
categoriaRoute.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);

//Crear nueva categoria - privado - cualquier con oken valido
categoriaRoute.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar un registro - privado - cualquier con token valido

categoriaRoute.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],
    actualizarCategoria);

//Borrar categoria por Id - privado - solo Administrador
categoriaRoute.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria)



export default categoriaRoute