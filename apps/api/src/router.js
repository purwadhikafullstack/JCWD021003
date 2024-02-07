import { Router, static as static_} from 'express';
// import { sampleRouter } from './routers/sample.router';
import { authRouter} from './routers/auth.router'
import { userRouter } from './routers/user.router';
import {productRouter} from './routers/product.router';
import { userAddressRouter } from './routers/userAddress.router';
import { warehouseAddressRouter } from './routers/warehouseAddress.router'
import { warehouseRouter } from './routers/warehouse.router';
import path from 'path';

const router = Router();

router.get('/', (req, res) => {
  res.send(`Hello, Purwadhika Student !`);
});

// router.use('/sample', sampleRouter);

// add another router here ...
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/user-address', userAddressRouter);
router.use('/warehouse-address', warehouseAddressRouter);
router.use('/warehouse', warehouseRouter)
router.use("/uploads", static_(path.join(__dirname, "./public/images")));



export default router;
