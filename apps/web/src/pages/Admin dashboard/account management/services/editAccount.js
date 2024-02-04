import axios from "axios";

export const editAccount = async (id, username, email, password, roleId) => {
    const token = localStorage.getItem("token")
    try{
        await axios.patch(`http://localhost:8000/api/user/${id}`, {
            id, username, email, password, roleId
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