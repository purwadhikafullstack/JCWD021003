import axios from "axios";

export const createRequest = async (email, setLoading, openSuccessModal, openErrorModal) => {
    try {
        setLoading(true);
        await axios.post(`${import.meta.env.VITE_API_URL}auth/request-password-reset`,
        {
            email,
        });
        setLoading(false);
        openSuccessModal();
    } catch (err){
        openErrorModal();
        setLoading(false);
    }
}
