import { Producto } from "../models/producto.js"



//obtenerProductos - paginando - total - populate
const obtenerProductos = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ]);
    res.json({
        total,
        productos
    })
}
//obtenerProducto Por ID -  populate
const obtenerProducto = async (req, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre');

    res.json(producto);
}

//Crear un nuevo producto
const crearProducto = async (req = request, res = response) => {
    const { estado, nombre, usuario, ...body } = req.body;
    const productoDB = await Producto.findOne({ nombre })
    if (productoDB) {
        return res.status(400).json({
            msg: `El prodcuto ${productoDB.nombre}, ya existe`
        })
    }

    //Generar la data a guardar
    const data = {
        nombre: nombre.toUpperCase(),
        usuario: req.usuario._id,
        ...body,
        // categoria: req.categoria_id
    }
    const producto = new Producto(data);

    //Guardar DB
    await producto.save();
    res.status(201).json(producto);
}

//actualizarProducto 
const actualizarProducto = async (req = request, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json(producto);
}

//borrarProducto - estado: false
const borraProducto = async (req = request, res = response) => {
    const { id } = req.params;

    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(productoBorrado)
}




export {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borraProducto
}