import {Router} from "express"
import {create, getAll} from "../controllers/history.controller";


export const historyRoutes = Router()

historyRoutes.get('/get-history', getAll)
historyRoutes.post('/create-history', create)