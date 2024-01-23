import { Router } from 'express'
import {getProductController, productCategoryController, productDetailController} from '../controllers/product.controller'


const productRouter = Router();
productRouter.get('/', getProductController)
productRouter.get("/category", productCategoryController);
productRouter.get('/details/:id', productDetailController)


export { productRouter };
