import { Router } from "express";
import { usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut } from "../controllers/usuarios.js";

const userRoutes = Router();


userRoutes.get('/', usuariosGet);
userRoutes.post('/', usuariosPost)
userRoutes.put('/:id', usuariosPut)
userRoutes.patch('/', usuariosPatch)
userRoutes.delete('/', usuariosDelete)

export default userRoutes 