import axios from "axios";

export const register = async (email, username, setLoading, openSuccessModal, openErrorModal
) => {
    try {
        setLoading(true);
        await axios.post(`${import.meta.env.VITE_API_URL}auth/user-registration`, {
            email,
            username,
        });
        setLoading(false);
        openSuccessModal();
    } catch (err) {
        setLoading(false);
        openErrorModal();
    }
};