import { Router } from "express";
import { buscar } from "../controllers/buscar.js"

const buscarRoute = Router();

buscarRoute.get('/:coleccion/:termino', buscar)

export { buscarRoute }