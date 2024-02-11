
import axios from "axios";

const token = localStorage.getItem("token")

export const getWarehouseList = async () => {
    
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}warehouse/list`, 
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

export const getProvince = async (name) => {
  try{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}user-address/province-list?name=${name}`)
    return response?.data?.data
    
  } catch (err){
    console.log(err);
  }
}

export const getWarehouseAdmin = async (warehouseId) => {
  try {
    const response  = await axios.get(`${import.meta.env.VITE_API_URL}warehouse/admin/${warehouseId}`)
    return response?.data?.data
  } catch (err){
    console.log(err);
  }
}

export const findOpenCageAndCity = async (latitude, longitude) => {
  try{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}user-address/address-city?latitude=${latitude}&longitude=${longitude}`)
      const address = response.data
      console.log(address)
      return address
  } catch (err){
      console.log(err);
  }
}

export const getProvinceWarehouse = async () => {
  try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}user-address/province`,);
      const province = response?.data?.data

      return province

  } catch (err){
      console.log(err);
  }
}

export const getCity = async (id) => {
  try{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}user-address/city/${id}`)
      const city = response?.data?.data
      return city
  } catch (err){
      console.log(err);
  }
}