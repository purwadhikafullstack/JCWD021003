import axios from "axios";

export const getProvince = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/user-address/province",);
        const province = response?.data?.data

        return province

    } catch (err){
        console.log(err);
    }
}

export const getCity = async (id) => {
    try{
        const response = await axios.get(`http://localhost:8000/api/user-address/city/${id}`)
        const city = response?.data?.data
        return city
    } catch (err){
        console.log(err);
    }
}


