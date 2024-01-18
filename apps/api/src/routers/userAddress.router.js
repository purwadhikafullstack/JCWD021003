import { Router } from 'express';
import { findMainUserAddressController, createUserAddressController, findProvinceController, findCityController } from '../controllers/userAddress.controller';
const userAddressRouter = Router();

// GET
userAddressRouter.get("/main-address/:id", findMainUserAddressController);
userAddressRouter.get("/province", findProvinceController);
userAddressRouter.get("/city/:id", findCityController);

//POST 
userAddressRouter.post("/create-user-address/:id", createUserAddressController);

export {userAddressRouter};