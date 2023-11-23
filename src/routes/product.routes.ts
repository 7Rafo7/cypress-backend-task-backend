import {Router} from "express"
import {getAll, getOne, create, update, remove} from "../controllers/product.controller";

export const productRoutes = Router()

productRoutes.get('/get-products', getAll);
productRoutes.get('/get-product/:id', getOne);
productRoutes.post('/create-product', create);
productRoutes.put('/update-product/:id', update);
productRoutes.delete('/delete-product/:id', remove);


