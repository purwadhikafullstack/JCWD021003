import { findMainUserAddressQuery, createUserAddressQuery, findProvinceQuery, findCityQuery, opencageQuery, findCityOpenCageBasedQuery, CityOpencageQuery } from "../queries/userAddress.queries";

export const findMainUserAddressService = async (id) => {
    try{
        const res = await findMainUserAddressQuery(id)
        return res
    } catch (err){
        throw err
    }
}

export const findProvinceService = async () => {
    try{
        const res = await findProvinceQuery()
        return res
    } catch (err){
        throw err
    }
}

export const findCityService = async (id) => {
    try{
        const res = await findCityQuery(id)
        return res
    } catch (err){
        throw err
    }
}

export const createUserAddressService = async (id, specificAddress, cityId, fullName, phoneNumber) => {
    try {
        const res = await createUserAddressQuery(id, specificAddress, cityId, fullName, phoneNumber)
        return res
    } catch (err){
        throw err
    }
}

export const opencageService = async (latitude, longitude) => {
    try{
        const API_KEY = process.env.OPENCAGE_API_KEY;
        const res = await opencageQuery(latitude, longitude, API_KEY)
        return res
    } catch (err){
        throw err
    }
}

export const findCityOpenCageBasedService = async (cityName) => {
    try{
        const res = await findCityOpenCageBasedQuery(cityName)
        return res
    } catch (err){
        throw err
    }
}

export const findCityOpenCageBasedService2 = async (city) => {
    try{
        const API_KEY = process.env.OPENCAGE_API_KEY;
        const res = await CityOpencageQuery(city, API_KEY)
        return res
    } catch (err){
        throw err
    }
}