import axios from "axios";

export const editAccount = async (id, username, email, password, roleId,warehouse) => {
    const token = localStorage.getItem("token")
    try{
        await axios.patch(`${import.meta.env.VITE_API_URL}user/${id}`, {
            id, username, email, password, roleId, warehouse
        },
        {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
    } catch (err){
        console.log(err);
    }
}