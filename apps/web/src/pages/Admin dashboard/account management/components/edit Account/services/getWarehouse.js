import axios from "axios";

export const getWarehouseList = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}warehouse/list`,);
        const warehouse = response?.data?.data

        return warehouse

    } catch (err){
        console.log(err);
    }
}