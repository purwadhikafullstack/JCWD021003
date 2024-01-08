/* eslint-disable no-useless-catch */
import {Box,InputGroup, InputRightElement,Button,Input,FormLabel,Text,FormControl,FormErrorMessage,useToast, useDisclosure
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import { registerScheme } from "../services/validation";
import { register } from "../services/registerUser";
import { SuccessModal, ErrorModal } from "../services/PopUpModal";

export const RegisterSection = ({setOpenTab}) => {
	const { isOpen: isSuccessModalOpen, onOpen: openSuccessModal, onClose: closeSuccessModal } = useDisclosure();
    const { isOpen: isErrorModalOpen, onOpen: openErrorModal, onClose: closeErrorModal } = useDisclosure();
	const navigate = useNavigate();
	const toast = useToast()

	
	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
		},
		validationSchema: registerScheme,
		onSubmit: async (values, {resetForm}) => {
            try{
                await register(values.email, values.username, setLoading, openSuccessModal, openErrorModal);
            } catch (err){
                console.log("gagal error");
            }
            resetForm({values:{email: "", username:""}})
        }
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
				}}	>
				<Box
					w={"100%"}
					h={"100%"}
					p={"5px 45px"}
					display={"flex"}
					flexDirection={"column"}
					justifyContent={"center"}
					alignItems={"center"}
					gap={3}
				>
					<FormLabel
						fontSize={"24px"}
						my={"-10px"}
						mb={{ base: "30px", md: "0" }}
					>
						Register
					</FormLabel>

					<InputGroup>
						<Input
							type="text"
							placeholder="Username"
							bgColor={"white"}
							name="username"
							value={formik.values.username}
							onChange={formik.handleChange}
						/>
					</InputGroup>

					<FormControl
						isInvalid={formik.touched.email && formik.errors.email}
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

					{/* <FormControl
						isInvalid={
							formik.touched.password && formik.errors.password
						}
						w={"full"}
						display={"flex"}
						gap={5}
					>
						<InputGroup w={"50%"}>
							<Input
								type={showP ? "text" : "password"}
								placeholder="Password"
								bgColor={"white"}
								fontSize={"12px"}
								name="password"
								value={formik.values.password}
								onChange={formik.handleChange}
							/>
							<InputRightElement>
								<Box
									onClick={() => {
										setShowp(!showP);
									}}
									size={"xm"}
									display={"flex"}
									alignItems={"center"}
									cursor={"pointer"}
								>
									{showP ? <ViewOffIcon /> : <ViewIcon />}
								</Box>
							</InputRightElement>
						</InputGroup>
						<InputGroup w={"50%"}>
							<Input
								type={showCp ? "text" : "password"}
								placeholder="Confirm Password"
								bgColor={"white"}
								fontSize={"12px"}
								name="confirmPassword"
								value={formik.values.confirmPassword}
								onChange={formik.handleChange}
							/>
							<InputRightElement>
								<Box
									onClick={() => {
										setShowCp(!showCp);
									}}
									size={"xm"}
									display={"flex"}
									alignItems={"center"}
									cursor={"pointer"}
								>
									{showCp ? <ViewOffIcon /> : <ViewIcon />}
								</Box>
							</InputRightElement>
						</InputGroup>
						{formik.touched.password && formik.errors.password && (
							<FormErrorMessage position={"absolute"} mt={10}>
								{formik.errors.password}
							</FormErrorMessage>
						)}
					</FormControl> */}

					<FormControl w={"50%"}></FormControl>

					<Button
						w={"full"}
						bgColor={"green"}
						color={"white"}
						type="submit"
					>
						Sign up
					</Button>
				</Box>
                <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
                <ErrorModal isOpen={isErrorModalOpen} onClose={closeErrorModal} />

				<Text display={"flex"} fontSize={"14px"} mt={'5px'}>
					Sudah Punya Akun?
					<Link to="/login" style={{ marginLeft: "5px" }}>
						Login
					</Link>
				</Text>
			</form>
		</Box>
	);
};