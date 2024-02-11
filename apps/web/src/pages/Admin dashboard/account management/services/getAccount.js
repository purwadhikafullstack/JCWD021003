import axios from "axios";

export const getAdminList = async () => {
    const token = localStorage.getItem("token")
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}user/admin`, 
        {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        return response?.data?.data
    } catch (err){
        console.log(err);
    }
}

export const getUserList = async ( page = 1, 
  pageSize = 1) => {
    const token = localStorage.getItem("token")
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}user/user?page=${page}&pageSize=${pageSize}`, 
        {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        return response?.data?.data
    } catch (err){
        console.log(err);
    }
}