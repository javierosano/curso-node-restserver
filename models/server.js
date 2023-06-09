import express from 'express';
import cors from 'cors';

import dbConnection from '../databse/config.js';

import authRoute from '../routes/auth.js'
import { buscarRoute } from '../routes/buscar.js';
import categoriaRoute from '../routes/categorias.js';
import productoRoute from '../routes/productos.js';
import userRoutes from '../routes/usuarios.js';


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios'
        }

        //Conectar a base de Datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        //Lectura y parseo del Body
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.path.auth, authRoute)
        this.app.use(this.path.buscar, buscarRoute)
        this.app.use(this.path.categorias, categoriaRoute)
        this.app.use(this.path.productos, productoRoute)
        this.app.use(this.path.usuarios, userRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);

        });
    }

}

export default Server 