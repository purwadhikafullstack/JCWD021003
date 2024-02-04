import { Router } from 'express';
import { updateUsernameController, updateEmailController, updatePasswordController, uploadAvatarFileController,findAdminController,findUserController,updateUserController,deleteUserController } from '../controllers/user.controller';
import { uploadAvatarFile } from '../middleware/multer.middleware';
import { verifyToken, checkRoleSuperadmin, checkRoleAdmin } from '../middleware/auth.middleware';
const userRouter = Router();

//GET
userRouter.get('/admin', findAdminController)
userRouter.get('/user', findUserController)

//PATCH
userRouter.patch('/:id', updateUserController)
userRouter.patch("/update-username/:id", updateUsernameController);
userRouter.patch("/update-email/:id", updateEmailController);
userRouter.patch("/update-password/:id", updatePasswordController);
userRouter.patch("/upload-avatar/:id", uploadAvatarFile, uploadAvatarFileController)

//DELETE
userRouter.delete('/:id',  deleteUserController)
export {userRouter};