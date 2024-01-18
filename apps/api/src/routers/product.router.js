import { Router } from 'express'
import {productCategoryController} from '../controllers/product.controller'


const productRouter = Router();
productRouter.get("/category", productCategoryController);


export { productRouter };
