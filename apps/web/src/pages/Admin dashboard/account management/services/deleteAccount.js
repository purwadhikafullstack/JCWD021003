import axios from "axios";

export const deleteAccountFunction = async (id) => {
    const token = localStorage.getItem("token")
    try {
        await axios.delete(`${import.meta.env.VITE_API_URL}user/${id}`, 
        {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        
    } catch (err){
        console.log(err);
    }
}