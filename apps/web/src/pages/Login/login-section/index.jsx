import {
	Box,InputGroup,InputRightElement,Button,Input,FormLabel,Text,FormControl,FormErrorMessage,useToast,	Image
} from "@chakra-ui/react";
import { signInWithGoogle } from "../../../firebase";
import { Link, useNavigate } from "react-router-dom";
import googleImg from "../../../assets/google.png";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { setUser, loginSuccess } from "../../../redux/reducer/authReducer";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import axios from "axios";

const registerScheme = Yup.object().shape({
	email: Yup.string().required("Email is required"),
	password: Yup.string().required("Password is required"),
});

export const LoginSection = () => {
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toast = useToast();

	const login = async (email, password) => {
		try {
			const res = await axios.post(
				"http://localhost:8080/auth/login",
				{
					email,
					password,
				}
			);
			localStorage.setItem("token", res?.data?.data?.token);
			dispatch(setUser(res?.data?.data?.user));
			dispatch(loginSuccess());

			toast({
				title: "Login Success",
				status: "success",
			});

			navigate("/");
		} catch (err) {
			toast({
				title: err.response?.data,
				status: "error",
			});
		}
	};

	const onLoginWithGoogle = async () => {
		try {
			const result = await signInWithGoogle();
			if (result === "signin with google success") {
				navigate("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: registerScheme,
		onSubmit: async (values) => {
			login(values.email, values.password);
		},
	});

	return (
		<Box w={{ base: "100%", sm: "70%", md: "50%" }}>
			<form
				onSubmit={formik.handleSubmit}
				style={{
					display: "flex",
					width: "100%",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Box
					w={"80%"}
					h={"350px"}
					p={"10px 45px"}
					display={"flex"}
					flexDirection={"column"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<FormLabel fontSize={"24px"} mb={"30px"}>
						Login
					</FormLabel>
					<FormControl
						isInvalid={formik.touched.email && formik.errors.email}
						mb={"20px"}
					>
						<InputGroup>
							<Input
								type="text"
								placeholder="Email"
								bgColor={"white"}
								name="email"
								value={formik.values.email}
								onChange={formik.handleChange}
							/>
						</InputGroup>
						{formik.touched.email && formik.errors.email && (
							<FormErrorMessage position={"absolute"} mt={0}>
								{formik.errors.email}
							</FormErrorMessage>
						)}
					</FormControl>

					<FormControl
						isInvalid={
							formik.touched.password && formik.errors.password
						}
						mb={"20px"}
					>
						<InputGroup>
							<Input
								type={show ? "text" : "password"}
								placeholder="Password"
								bgColor={"white"}
								name="password"
								value={formik.values.password}
								onChange={formik.handleChange}
							/>
							<InputRightElement>
								<Box
									onClick={() => {
										setShow(!show);
									}}
									size={"xm"}
									display={"flex"}
									alignItems={"center"}
									cursor={"pointer"}
								>
									{show ? <ViewOffIcon /> : <ViewIcon />}
								</Box>
							</InputRightElement>
						</InputGroup>
						{formik.touched.password && formik.errors.password && (
							<FormErrorMessage position={"absolute"} mt={0}>
								{formik.errors.password}
							</FormErrorMessage>
						)}
					</FormControl>

					<Button
						w={"full"}
						bgColor={"green"}
						color={"white"}
						type="submit"
					>
						Sign in
					</Button>
					<Box
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
						flexDirection={"column"}
						mt={"20px"}
					>
						<Text fontSize={"12px"} mb={"10px"}>
							Or Sign in with
						</Text>
						<Button size={"sm"} onClick={onLoginWithGoogle}>
							<Image
								src={googleImg}
								w={"15px"}
								mr={"7px"}
								alt="Google Image"
							/>
							Google
						</Button>
					</Box>
				</Box>
				<Text display={"flex"} fontSize={"14px"}>
					Belum Punya Akun?
					<Link to="/register" style={{ marginLeft: "5px" }}>
						Register
					</Link>
				</Text>
			</form>
		</Box>
	);
};
