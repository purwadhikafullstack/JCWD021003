import UserAddress from '../models/userAddress.model'
import Province from '../models/province.model'
import City from '../models/city.model.js'
import opencage from 'opencage-api-client'
import { Op } from 'sequelize';

//FIND
export const findMainUserAddressQuery = async (id) => {
    try{
        return await UserAddress.findOne(
            {where:
                {userId: id,
                isMainAddress: true},
            }
        )
    } catch (err){
        throw err;
    }
}

export const findProvinceQuery = async () => {
    try{
        return await Province.findAll()
    } catch (err){
        throw err;
    }
}

export const findCityQuery = async (id) => {
    try{
        return await City.findAll(
            {where:{
                provinceId: id
            }}
        )
    } catch (err){
        throw err
    }
}

export const findCityOpenCageBasedQuery = async (cityName) => {
    try{
        return await City.findOne(
            {where : {
                name: {[Op.substring]: cityName}
            }})

    } catch (err){
        throw err
    }
}

// POST 
export const createUserAddressQuery = async (id, specificAddress, cityId, fullName, phoneNumber) => {
    try{
        return await UserAddress.create(
            {   specificAddress,
                cityId,
                userId: id,
                fullName,
                phoneNumber,
                isMainAddress: true
            })
    } catch (err){
        throw err;
    }
}

export const opencageQuery = async (latitude, longitude, API_KEY) => {
    try{
        const response = await opencage.geocode({ q: `${latitude}, ${longitude}`,
        key: API_KEY,
        language: 'en' })
        console.log('res api opencage',response.results[1])
        return response.results[0]
    } catch (err){
        throw err
    }
}

export const CityOpencageQuery = async (city, API_KEY) => {
    try{
        const response = await opencage.geocode({ q: `${city}`,
        key: API_KEY,
        language: 'en' })
        console.log('res api opencage',response.results[1])
        return response
    } catch (err){
        throw err
    }
}