// import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux";
import toast from 'react-hot-toast'

export const LoggedInRoute = ({ children }) => {
	const user = useSelector((state) => state.AuthReducer.user);
	const check = localStorage.getItem("token");
	// if (check) 	return children;
	const canAccess = user && user.isVerified && check 
    if (!canAccess) {
		toast.error("Verify your account first.\nEmail verification has been sent to your email"); 
    }
	return canAccess ? children : <Navigate to="/" />;	
};