import axios from "axios";

export const getProvince = async () => {
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

export const getAddressOpenCage = async (latitude, longitude) => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}user-address/address?latitude=${latitude}&longitude=${longitude}`)
        const address = response?.data?.data?.components
        return address
    } catch (err){
        console.log(err);
    }
}

export const findOpenCageAndCity = async (latitude, longitude) => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}user-address/address-city?latitude=${latitude}&longitude=${longitude}`)
        const address = response.data
        return address
    } catch (err){
        console.log(err);
    }
}

export const getCityOpenCageBased = async (city) => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}user-address/city?city=${city}`)
        const cityData = response.data?.data
        return cityData
    } catch (err){
        console.log(err);
    }
}

export const findUserAddress = async (id, page,pageSize) => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}user-address/address/${id}?page=${page}&pageSize=${pageSize}`)
        const address = response.data?.data
        return address
    } catch (err){
        console.log(err);
    }
}

export const findUserAddressChekout = async (id) => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}user-address/address/${id}`)
        const address = response.data?.data
        return address
    } catch (err){
        console.log(err);
    }
}

export const getCityName = async (cityId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}user-address/specific-city/${cityId}`);
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get city name');
    }
  };

