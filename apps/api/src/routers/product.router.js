import { Router } from 'express'
import {getProductController, productCategoryController} from '../controllers/product.controller'


const productRouter = Router();
productRouter.get('/', getProductController)
productRouter.get("/category", productCategoryController);
productRouter.get('/details/:id', getProductController)


export { productRouter };
