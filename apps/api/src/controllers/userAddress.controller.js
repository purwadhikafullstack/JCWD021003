import { findUserAddressService, createUserAddressService, findProvinceService, findCityService, opencageService,findCityOpenCageBasedService,findCityOpenCageBasedService2,
    updateUserAddressService, updateMainAddressService, deleteUserAddressService, findLongLatService,findCitybyIdService} from "../services/userAddress.services";

export const findUserAddressController = async (req, res) => {
    try{
        const {id} = req.params
        const result = await findUserAddressService(id)
        return res.status(200).json({
            message: "find user address success",
            data: result
        });
    } catch (err){
        return res.status(500).json({
            message: err.message
        });        
    }
}

export const findProvinceController = async (req, res) => {
    try{ const result = await findProvinceService()
    return res.status(200).json({
        message: "success find province",
        data: result
    })
    } catch (err){
        return res.status(500).json({
            message: err.message
        })
    }
}

export const findCityController = async (req, res) => {
    try{
        const {id} = req.params
        const result = await findCityService(id)
        return res.status(200).json({
            message: "success find city",
            data: result
        })
    } catch (err){
        return res.status(500).json({
            message: err.message
        })
    }
}

export const findCitybyCityIdController = async (req, res) => {
    try{
        const {cityId} = req.params
        const result = await findCitybyIdService(cityId)
        return res.status(200).json({
            message: "success find city",
            data: result
        })
    } catch (err){
        return res.status(500).json({
            message: err.message
        })
    }
}

export const createUserAddressController = async (req, res) => {
    try{
        const {id} = req.query
        const { specificAddress, cityId, fullName, phoneNumber,postalCode,latitude,longitude} = req.body
        const result = await createUserAddressService (id, specificAddress, cityId, fullName, phoneNumber, postalCode,latitude,longitude)
        return res.status(200).json({
            message: "create user address success",
            data: result
        })
    } catch (err){
        return res.status(500).json({
            message: err.message
        });
    }
}

export const opencageController = async (req, res) => {
    try{
        const {latitude, longitude} = req.query
        const result = await opencageService(latitude, longitude)
        return res.status(200).json({
            message: "success",
            data: result
        })
    } catch (err){
        return res.status(500).json({
            message: err.message
        })
    }
}

export const findCityOpenCageBasedController = async (req, res) => {
    try {
        const {city} = req.query
        const result = await findCityOpenCageBasedService2(city)
        return res.status(200).json({
            message: "success",
            data: result
        })
    } catch (err){
        return res.status(500).json({
            message: err.message
        })
    }
}

//FIND ADDRESS FROM OPENCAGE API AND CITY FROM DATABASE COMBINED
export const findOpencageAndCityController = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        const addressResult = await opencageService(latitude, longitude);
        // console.log('data alamat',addressResult)
        const cityName = addressResult.components.municipality|| addressResult.components.county;

        const cityResult = await findCityOpenCageBasedService(cityName);

        return res.status(200).json({
            message: "success",
            address: addressResult.components,
            city: cityResult
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

//find long lat from postalcode

export const findLongLatController =async(req,res) => {
    try{
        const {postalCode} = req.body
        await findLongLatService(postalCode)
        return res.status(200).json({
            message: "find Latitude Longitude success",
            data: result
        })
    } catch (err){
        return res.status(500).json({
            message: err.message
        });
    }
}

//UPDATE USER ADDRESS
export const updateUserAddressController = async (req, res) => {
    try{
        const {id} = req.params
        const {specificAddress, cityId, fullName, phoneNumber, postalCode} = req.body
        await updateUserAddressService(id, specificAddress, cityId, fullName, phoneNumber, postalCode)
        return res.status(200).json({
            message: "update user data success",
        })
    } catch (err){
        return res.status(500).json({
            message: err.message
        });
    }
}

export const updateMainAddressController = async (req, res) => {
try {
    const {id, userId} = req.query
    await updateMainAddressService(id, userId)
    return res.status(200).json({
        message: "update mainAddress success",
    })
} catch (err){
    return res.status(500).json({
        message: err.message
    });
}
}

export const deleteUserAddressController = async (req, res) => {
    try{
        const {id} = req.params
        await deleteUserAddressService(id)
        return res.status(200).json({
            message: "delete user Address success",
        })
    } catch (err){
        return res.status(500).json({
            message: err.message
        });
    }
}