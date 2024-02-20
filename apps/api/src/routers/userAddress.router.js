import { Router } from 'express';
import { findUserAddressController, createUserAddressController, findProvinceController, findCityController, opencageController,findOpencageAndCityController,findCityOpenCageBasedController,updateUserAddressController,
    updateMainAddressController,deleteUserAddressController,findLongLatController,findCitybyCityIdController,findSearchableProvinceController,findUserAddressPagController } from '../controllers/userAddress.controller';
const userAddressRouter = Router();

// GET
userAddressRouter.get("/address/:id", findUserAddressPagController);
userAddressRouter.get("/province", findProvinceController);
userAddressRouter.get("/city/:id", findCityController);
userAddressRouter.get("/specific-city/:cityId", findCitybyCityIdController);
userAddressRouter.get("/address", opencageController)
userAddressRouter.get("/address-city", findOpencageAndCityController);
userAddressRouter.get("/city", findCityOpenCageBasedController);
userAddressRouter.get("/coordinates", findLongLatController);
userAddressRouter.get('/province-list', findSearchableProvinceController)


//POST 
userAddressRouter.post("/create-user-address/", createUserAddressController);

//PATCH
userAddressRouter.patch("/update-user-address/:id", updateUserAddressController)
userAddressRouter.patch("/update-main-address", updateMainAddressController)

//DELETE
userAddressRouter.delete("/delete-user-address/:id", deleteUserAddressController)

export {userAddressRouter};