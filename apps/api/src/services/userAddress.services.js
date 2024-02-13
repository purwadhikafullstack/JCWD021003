import { findUserAddressQuery, createUserAddressQuery, findProvinceQuery, findCityQuery, opencageQuery, findCityOpenCageBasedQuery, CityOpencageQuery,
    updateUserAddressQuery,updateMainAddressQuery,deleteUserAddressQuery,LongLatQuery,findCitybyIdQuery,findOneUserAddress, removeMainAddressQuery, findSearchableProvinceQuery,findUserAddressPagQuery } from "../queries/userAddress.queries";

export const findUserAddressService = async (id) => {
    try{
        const res = await findUserAddressQuery(id)
        return res
    } catch (err){
        throw err
    }
}
export const findUserAddressPagService = async (id,page,pageSize) => {
    try{
        const res = await findUserAddressPagQuery(id,page,pageSize)
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

export const findCitybyIdService = async (cityId) => {
    try{
        const res = await findCitybyIdQuery(cityId)
        return res.dataValues.name
    } catch (err){
        throw err
    }
}

export const findLongLatService = async (postalCode) => {
    try{
        const API_KEY = process.env.OPENCAGE_API_KEY;
        const res = await LongLatQuery(postalCode, API_KEY)
        return res
    } catch (err){
        throw err
    }
}

export const findSearchableProvinceService = async (name) => {
    try {
        const res = await findSearchableProvinceQuery(name)
        return res
    } catch (err){
        throw err
    }
}

export const createUserAddressService = async (id, specificAddress, cityId, fullName, phoneNumber, postalCode, latitude,longitude) => {
    try {
        const existingAddress = await findOneUserAddress(id)

        const isMainAddress = !existingAddress;

        const res = await createUserAddressQuery(id, specificAddress, cityId, fullName, phoneNumber,isMainAddress, postalCode,latitude,longitude)
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
        return res.results[0].geometry
    } catch (err){
        throw err
    }
}

export const updateUserAddressService = async (id, fullName,phoneNumber, location, cityId, postalCode, lat, lng) => {
    try { 
        await updateUserAddressQuery(id, fullName,phoneNumber, location, cityId, postalCode, lat, lng)
    } catch (err){
        throw err
    }
}

export const updateMainAddressService = async (id, userId) => {
    try{
        await removeMainAddressQuery(userId)
        await updateMainAddressQuery(id)
    } catch (err){
        throw err
    }
}

export const deleteUserAddressService = async (id) => {
    try{
        await deleteUserAddressQuery(id)
    } catch (err){
        throw err
    }
}