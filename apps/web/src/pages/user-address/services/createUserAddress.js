import axios from "axios";

export const createUserAddress = async (id, specificAddress, cityId, fullName, phoneNumber) => {
try{ 
    await axios.post(`http://localhost:8000/api/user-address/create-user-address/${id}`, {
    specificAddress,
    cityId,
    fullName,
    phoneNumber
    });
    } catch (err){
        console.log(err)
    }
}