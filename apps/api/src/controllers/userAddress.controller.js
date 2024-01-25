import { findMainUserAddressService, createUserAddressService, findProvinceService, findCityService, opencageService,findCityOpenCageBasedService,findCityOpenCageBasedService2 } from "../services/userAddress.services";

export const findMainUserAddressController = async (req, res) => {
    try{
        const {id} = req.params
        const result = await findMainUserAddressService(id)
        return res.status(200).json({
            message: "success",
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

export const createUserAddressController = async (req, res) => {
    try{
        const {id} = req.params
        // console.log("ini id",id)
        const { specificAddress, cityId, fullName, phoneNumber} = req.body
        const result = await createUserAddressService (id, specificAddress, cityId, fullName, phoneNumber)
        return res.status(200).json({
            message: "success",
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