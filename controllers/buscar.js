import { response } from "express";
import { isValidObjectId } from "mongoose";
import { Usuario } from "../models/usuario.js";
import { Categoria } from "../models/categoria.js";
import { Producto } from "../models/producto.js";


const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]


const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoId = isValidObjectId(termino)

    if (esMongoId) {
        const usuario = await Usuario.findById(termino);

        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }


    const regexp = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{ nombre: regexp }, { correo: regexp }],
        $and: [{ estado: true }]
    })

    res.json({

        resultados: usuarios.length,
        usuarios
    })
}


const buscarCategorias = async (termino = '', res = response) => {
    const esMongoId = isValidObjectId(termino)

    if (esMongoId) {
        const categoria = await Categoria.findById(termino).populate('usuario', 'nombre');;

        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }


    const regexp = new RegExp(termino, 'i');

    const categoria = await Categoria.find({
        nombre: regexp, estado: true
    }).populate('usuario', 'nombre');;

    res.json({

        resultados: categoria.length,
        categoria
    })
}

const buscarProductos = async (termino = '', res = response) => {
    const esMongoId = isValidObjectId(termino)

    if (esMongoId) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');

        return res.json({
            results: (producto) ? [producto] : []
        })
    }


    const regexp = new RegExp(termino, 'i');

    const productos = await Producto.find({
        nombre: regexp, estado: true
    }).populate('categoria', 'nombre');

    res.json({

        resultados: productos.length,
        productos
    })
}


const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones pormitidas son: ${coleccionesPermitidas}`
        })
    }



    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;

        case 'categorias':
            buscarCategorias(termino, res)
            break;

        case 'productos':
            buscarProductos(termino, res)
            break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsqueda'
            })
            break;
    }

}


export { buscar }