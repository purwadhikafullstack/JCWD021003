import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
	user: {
		id: null,
		username: "",
		email: "",
		roleId: null,
		isVerified: null,
		avatar: "",
	},
	isLogin: false,
};

export const AuthReducer = createSlice({
	name: "AuthReducer",
	initialState,
	reducers: {
		setUser: (state, action) => {
			const { id, username, email , roleId, isVerified, avatar } =
				action.payload;

			state.user = {
				id,
				username,
				email,
				roleId,
				isVerified,
				avatar
			};
			
		},
		loginSuccess: (state, action) => {
			state.isLogin = true;
		},
		logoutSuccess: (state, action) => {
			state.isLogin = false;
			localStorage.removeItem("token");
		},
		keepLoginSuccess: (state) => {
			state.isLogin = true;
		},
	},
});

export const login = (email, password, setLoading, openSuccessModal, openErrorModal) => {
	return async (dispatch) => {
		try {
			const res = await axios.post(
				"http://localhost:8000/api/auth/login",
				{
					email,
					password,
				}
			)
			localStorage.setItem("token", res?.data?.data?.token);
			dispatch(setUser(res?.data?.data?.user));
			dispatch(loginSuccess());
			openSuccessModal();
       		setLoading(false);
			} catch (err) {
			// alert(err?.response?.data.message);
			openErrorModal();
			setLoading(false);
			throw err;
		}
	};
};

export const Googlelogin = (username, email, avatar,setLoading, openSuccessModal, openErrorModal) => {
	return async (dispatch) => {
		try {
			const res = await axios.post(
				"http://localhost:8000/api/auth/google",
				{
					username,
					email,
					avatar,
				}
			)
			localStorage.setItem("token", res?.data?.data?.token);
			dispatch(setUser(res?.data?.data?.user));
			openSuccessModal();
       		setLoading(false);
			dispatch(loginSuccess());
			} catch (err) {
			alert(err?.response?.data.message);
			throw err;
		}
	};
};

export const keepLogin = () => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem("token");

			if (token) {
				const res = await axios.get(
					"http://localhost:8000/api/auth/keep-login",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				dispatch(setUser(res?.data?.data));
				dispatch(keepLoginSuccess());
			}
		} catch (err) {
			localStorage.removeItem("token");
			toast(err?.response?.data);
		}
	};
};

export const {
	loginSuccess,
	logoutSuccess,
	setUser,
	keepLoginSuccess,
} = AuthReducer.actions;

export default AuthReducer.reducer;
