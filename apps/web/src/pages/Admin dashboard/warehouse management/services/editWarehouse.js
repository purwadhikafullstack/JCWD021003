import axios from "axios";

const token = localStorage.getItem("token")

export const editWarehouse = async (id, name,location, cityId, postalCode, lat, lng) => {    
    console.log("ini token", token);
    try{
        await axios.patch(`http://localhost:8000/api/warehouse/${id}`, {
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
        console.log(err);
    }
}

export const assignAdminWarehouse = async (adminIds, warehouseId) => {
    try {
        await axios.patch(`http://localhost:8000/api/warehouse/assign/${warehouseId}`, 
            { adminIds }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    } catch (err) {
        console.log(err);
    }
};