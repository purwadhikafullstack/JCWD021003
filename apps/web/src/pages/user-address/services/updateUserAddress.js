import axios from "axios";

export const updateUserAddress = async (id, specificAddress, cityId, fullName, phoneNumber, postalCode) => {
    try{
        await axios.patch(`${import.meta.env.VITE_API_URL}user-address/update-user-address/${id}`, {
            specificAddress, 
            cityId, 
            fullName, 
            phoneNumber, 
            postalCode  
        })
    } catch (err){
        console.log(err);
    }
}

export const updateMainAddress = async (id, userId) => {
    try{
        await axios.patch (`${import.meta.env.VITE_API_URL}user-address/update-main-address?id=${id}&userId=${userId}`)
    } catch (err){
        console.log(err);
    }
}