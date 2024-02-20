import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
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
		warehouseId: null,
	},
	isLogin: false,
};

export const AuthReducer = createSlice({
	name: "AuthReducer",
	initialState,
	reducers: {
		setUser: (state, action) => {
			const { id, username, email , roleId, isVerified, avatar,warehouseId } =
				action.payload;

			state.user = {
				id,
				username,
				email,
				roleId,
				isVerified,
				avatar,
				warehouseId,
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
	// extra Reducer
	// extraReducers: (builder) => {
	// 	builder.addCase(updateUser.fulfilled, (state, action) => {
	// 	  const updatedUser = action.payload;
	
	// 	  state.user = {
	// 		...state.user,
	// 		...updatedUser,
	// 	  };
	// 	});
	//   },
});

export const updateUser = createAsyncThunk('AuthReducer/updateUser', async (updatedUserData) => {
	const response = await axios.patch(`${import.meta.env.VITE_API_URL}user/update-user`, updatedUserData);
	return response.data;
  });

export const login = (email, password, setLoading, openSuccessModal, openErrorModal) => {
	return async (dispatch) => {
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}auth/login`,
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
			setLoading(true);
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}auth/google`,
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
					`${import.meta.env.VITE_API_URL}auth/keep-login`,
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
