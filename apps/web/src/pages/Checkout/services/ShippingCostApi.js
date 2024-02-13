import axios from "axios";

export const getNearestWarehouse = async (userLat, userLong) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}warehouse-address/nearest-warehouse?userLat=${userLat}&userLong=${userLong}`,);
        const warehouse = response?.data?.data
        return warehouse

    } catch (err){
        console.log(err);
    }
}

export const getShippingCost = async (origin, destination, weight, courier) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}warehouse-address/shipping-cost`, {
            origin,
            destination,
            weight,
            courier
        })
        return response?.data?.data
    } catch(err){
        console.log(err);
    }
}