// import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const LoggedInRoute = ({ children }) => {

	const check = localStorage.getItem("token");

	// if (check) 	return children;
	
	return check && children || <Navigate to="/login" />;
	
};