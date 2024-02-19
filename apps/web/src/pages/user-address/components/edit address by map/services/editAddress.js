import axios from "axios";

const token = localStorage.getItem("token")

export const editAddress = async (id, fullName,phoneNumber, location, cityId, postalCode, lat, lng) => {    
    try{
        await axios.patch(`${import.meta.env.VITE_API_URL}user-address/update-user-address/${id}`, {
            id, 
            fullName,
            phoneNumber,
            location, 
            cityId, 
            postalCode, 
            lat, 
            lng 
        },
        {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
          )
    } catch (err){
        throw new Error('Failed to edit user address');
    }
}