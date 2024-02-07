import axios from "axios";

export const getWarehouseList = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/warehouse/list",);
        const warehouse = response?.data?.data

        return warehouse

    } catch (err){
        console.log(err);
    }
}