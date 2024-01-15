import { Router, static as static_} from 'express';
// import { sampleRouter } from './routers/sample.router';
import { authRouter} from './routers/auth.router'
import { userRouter } from './routers/user.router';
import path from 'path';

const router = Router();

router.get('/', (req, res) => {
  res.send(`Hello, Purwadhika Student !`);
});

// router.use('/sample', sampleRouter);

// add another router here ...
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use("/uploads", static_(path.join(__dirname, "./public/images")));



export default router;
