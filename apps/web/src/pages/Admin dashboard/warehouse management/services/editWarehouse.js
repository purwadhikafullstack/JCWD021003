import axios from "axios";

const token = localStorage.getItem("token")

export const editWarehouse = async (id, name,location, cityId, postalCode, lat, lng) => {    
    try{
        await axios.patch(`${import.meta.env.VITE_API_URL}warehouse/${id}`, {
            id, 
            name,
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
        throw new Error('Failed to edit warehouse');    
    }
}