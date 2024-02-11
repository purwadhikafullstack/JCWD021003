import { AbsoluteCenter, Box, Button, Flex, FormControl, Icon, Image, Input, InputGroup, InputLeftElement,InputRightElement, Text, useToast,IconButton,useDisclosure } from "@chakra-ui/react"
import model from '../../assets/icon2.png'
import {Link, useNavigate, Navigate} from 'react-router-dom'
import { EnvelopeIcon, LockClosedIcon,EyeSlashIcon, EyeIcon} from '@heroicons/react/24/outline'
import { useFormik } from "formik"
import {useDispatch, useSelector} from 'react-redux'
import {signInWithGoogle} from '../../firebase'
import googleImg from '../../assets/google.png'
import { login, Googlelogin } from "../../redux/reducer/authReducer"
import { IoHome } from "react-icons/io5";
import { useState } from "react"
import { SuccessModal,ErrorModal } from "./services/PopModal"
import { BeatLoader } from "react-spinners"
import toast from 'react-hot-toast'

function Signin() {
    const isLogin = useSelector((state) => state.AuthReducer.isLogin);
    const dispatch = useDispatch();
	const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { isOpen: isSuccessModalOpen, onOpen: openSuccessModal, onClose: closeSuccessModal } = useDisclosure();
    const { isOpen: isErrorModalOpen, onOpen: openErrorModal, onClose: closeErrorModal } = useDisclosure();
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "white",
    };
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues:{
            email: "",
            password:"",
        },
        onSubmit: (values) => {
            try{
            dispatch(login(values.email, values.password,setLoading, openSuccessModal, openErrorModal))
            formik.resetForm();
            } catch (error){
            toast.error("Login failed. Please try again.");
            }
        }
    }) 

	const onLoginWithGoogle = async () => {
		try {
			const result = await signInWithGoogle();
			if (result) {
				dispatch(Googlelogin(result.username, result.email, result.avatar,setLoading, openSuccessModal, openErrorModal))
			}
            toast.success('Login Success!')
		} catch (error) {
			console.log(error);
		}
	};
    if (isLogin){
        return <Navigate to={'/'} replace={true}/>
    }
  return (
    <>
        <Flex height={'100%'} width={'100%'} boxShadow={'base'}>
            <Box width={'50%'} height={'100vh'} position={'relative'}>
                <Image borderTopRightRadius={'20'} borderBottomRightRadius={'20'} src={model} width={'730px'} height={'100vh'} objectFit={'cover'} opacity={'75%'}/>
                {/* <AbsoluteCenter>
                    <Image src={logo}/>
                </AbsoluteCenter> */}
            </Box>
            <Flex justifyContent={'center'} alignItems={'center'} alignContent={'center'} width={'50%'} margin={'50'}>
                <Box width={'450px'}>
                <Text fontWeight={'800'} color={'green'} textAlign={'center'} fontSize={'42px'} marginBottom={'40px'}>SIGN IN</Text>
                <form onSubmit={formik.handleSubmit}>
                <FormControl>    
                    <InputGroup marginBottom={'32px'}>
                    <Input
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        _placeholder={{color:"#707070"}}
                        height={'64px'}
                        bg={'#EEEDED'}
                        color={'#707070'}
                        paddingLeft={'72px'}
                        fontSize={'20px'}
                        borderRadius={'16px'}
                    />
                    <InputLeftElement top={'12px'} width={'72px'}>
                        <Flex justifyContent={'center'} alignItems={'center'} height={'64px'}>
                        <Icon as={EnvelopeIcon} boxSize={'24px'} margin={'auto'} position={'relative'} textColor={'green.grey350'}/>
                        </Flex>
                    </InputLeftElement>
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <InputGroup marginBottom={'12px'}>
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        _placeholder={{color:"#707070"}}
                        height={'64px'}
                        bg={'#EEEDED'}
                        color={'#707070'}
                        paddingLeft={'72px'}
                        fontSize={'20px'}
                        borderRadius={'16px'}
                    />
                    <InputLeftElement top={'12px'} width={'72px'}>
                        <Flex justifyContent={'center'} alignItems={'center'} height={'64px'}>
                        <Icon as={LockClosedIcon} boxSize={'24px'} margin={'auto'} position={'relative'} textColor={'green.grey350'}/>
                        </Flex>
                    </InputLeftElement>
                    <InputRightElement top={'12px'} width={'54px'}>
						<Button
							variant={"ghost"}
							onClick={() => setShowPassword((showPassword) => !showPassword)}
							backgroundColor={"transparent"}
                            height={'64px'}
                            _hover={'none'}
                            color={'#707070'}
						>
							{showPassword ? <Icon as={EyeIcon} boxSize={'24px'}/> : <Icon as={EyeSlashIcon} boxSize={'24px'}/>}
						</Button>
					</InputRightElement>
                    </InputGroup>
                    <Flex justifyContent={"center"} mb={"25px"}>
					<Link to="/password-reset-request" style={{ marginLeft: "5px" }}>
                    <Text display={"flex"} fontSize={"14px"}>
					Forget&nbsp;<b>Password</b>?
                    </Text>
					</Link>
                    </Flex>
                </FormControl>
                {loading ? (<Button width={'100%'} height={'68px'} borderRadius={'16px'} fontSize={'24px'} fontWeight={'700'} color={'white'} bg={'green'} _hover={{bg: '#f50f5a'}} _active={{opacity:'70%'}}>
                    <div className="sweet-loading">
                        <BeatLoader color={"#ffffff"}
							loading={loading}
							cssOverride={override}
							size={10}
							aria-label="spiner"
							data-testid="loader"/>
                    </div></Button>) : (
                    <Button width={'100%'} height={'68px'} borderRadius={'16px'} fontSize={'24px'} fontWeight={'700'} color={'white'} bg={'green'} _hover={{bg: '#f50f5a'}} _active={{opacity:'70%'}} type="submit">SIGN IN</Button>
                )}
                {/* <Button width={'100%'} height={'68px'} borderRadius={'16px'} fontSize={'24px'} fontWeight={'700'} color={'white'} bg={'green'} _hover={{bg: 'red'}} _active={{opacity:'70%'}} type="submit">SIGN IN</Button> */}

				<Box
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
						flexDirection={"column"}
						mt={"20px"}
					>
						<Text fontWeight={600} fontSize={"12px"} mb={"10px"}>
							Or Sign in with
						</Text>
						<Button border={'1.3px solid black'} bgColor={"white"} size={"sm"} _hover={{bgColor:'green',color:'white'}} onClick={onLoginWithGoogle}>
							<Image
								src={googleImg}
								w={"15px"}
								mr={"7px"}
								alt="Google Image"
							/>
							Google
						</Button>
					</Box>
				<Text fontWeight={600} display={"flex"} fontSize={"14px"} mt={"25px"} py={"auto"} alignItems={"center"}>
					Don't have an account?
					<Link to="/register" style={{ marginLeft: "5px" }}>
                        <Button color={"white"} bg={"green"} borderRadius={20} _hover={{bgColor:'red'}}>Register</Button>
					</Link>
				</Text>
				<Flex justifyContent={'right'}
                alignItems={'center'} 
                gap={'24px'}
                mt={'20px'}>
                <Link to='/'>
                    <IconButton
                    colorScheme='red'
                    size='lg'
                    icon={<IoHome />} />
                </Link>
                </Flex>
                </form>
                <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
                <ErrorModal isOpen={isErrorModalOpen} onClose={closeErrorModal} />
                </Box>
            </Flex>
        </Flex>
    </>
  )
}

export default Signin