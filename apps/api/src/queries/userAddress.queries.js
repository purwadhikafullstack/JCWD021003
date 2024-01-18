import UserAddress from '../models/userAddress.model'
import Province from '../models/province.model'
import City from '../models/city.model'

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

// POST 
export const createUserAddressQuery = async (id, specificAddress, cityId, fullName, phoneNumber) => {
    try{
        return await UserAddress.create(
            {   specificAddress,
                cityId,
                userId: id,
                fullName,
                phoneNumber,
            })
    } catch (err){
        throw err;
    }
}