import axios from "axios";

export const login = async (email, password) => {
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}auth/login`,
        {
            email,
            password
        });
        // toast.success("Account created");
    } catch (err){
        // toast.error("Error occurred")
    }
}
