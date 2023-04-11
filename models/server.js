import express from 'express';
import cors from 'cors';

import userRoutes from '../routes/usuarios.js';

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
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
        this.app.use(this.usuariosPath, userRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);

        });
    }

}

export default Server 