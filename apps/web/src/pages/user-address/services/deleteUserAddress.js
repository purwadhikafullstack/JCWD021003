import axios from "axios"

export const deleteUserAddress = async (id) => {
    try{
        await axios.delete(`${import.meta.env.VITE_API_URL}user-address/delete-user-address/${id}`)
    } catch (err){
        console.log(err.message);
    }
}