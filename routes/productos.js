import { Router, response } from "express";
import { check } from "express-validator";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { crearProducto, obtenerProductos, actualizarProducto, borraProducto } from "../controllers/productos.js";
import { existeCategoriaPorId, existeProductoPorId } from "../helpers/db-validators.js";
import { esAdminRole } from "../middlewares/validar-roles.js";

const productoRoute = new Router()

//obtener todas las categorias - publico
productoRoute.get('/', obtenerProductos)

//Crear nuevo Producto - privado - cualquier con oken valido
productoRoute.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoría asociada es obligatoria').not().isEmpty(),
    check('categoria', 'El id de la categoría debe ser válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

//Actualizar un registro - privado - cualquier con token valido
productoRoute.put('/:id', [
    validarJWT,
    // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto);

//Borrar categoria por Id - privado - solo Administrador
productoRoute.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borraProducto)


export default productoRoute