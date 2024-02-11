import { Stack,AbsoluteCenter, Box, Button, Flex, FormControl, Icon, Image, Input, InputGroup, InputLeftElement,InputRightElement, Text, useToast,IconButton,useDisclosure } from "@chakra-ui/react"
import {Link, useNavigate, Navigate} from 'react-router-dom'
import { EnvelopeIcon, LockClosedIcon,EyeSlashIcon, EyeIcon} from '@heroicons/react/24/outline'
import { useFormik } from "formik"
import {useDispatch, useSelector} from 'react-redux'
import {signInWithGoogle} from '../../firebase'
import googleImg from '../../assets/google.png'
import { login, Googlelogin } from "../../redux/reducer/authReducer"
import { useState } from "react"
import { SuccessModal,ErrorModal } from "./services/PopModal"
import toast from 'react-hot-toast'
import { Navbar } from "../../components/Navbar"

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
    <Box w={'100vw'} minW={'530px'} bgColor={'white'}>
        <Navbar/>
      <Flex height="100vh" justifyContent="center" alignItems="center" w={'100vw'} minW={'530px'}>
            <Stack direction={['column', 'column', 'row']} bg="white" p="6" borderRadius="xl" boxShadow="base">
            <form onSubmit={formik.handleSubmit}> 
                <Box flex={['none', 'none', '1']} bg="green" borderTopRightRadius={['xl', 'xl', 'none']} borderBottomRightRadius={['none', 'none', 'xl']} p={['6', '6', '6']}>
                    <Text fontWeight="bold" color="white" fontSize="2xl" textAlign="center" mb="4">SIGN IN</Text>
                    <FormControl mb="4">
                        <InputGroup>
                        <InputLeftElement width={'42px'}>
                        <Flex justifyContent={'center'} alignItems={'center'} height={'64px'}>
                        <Icon as={EnvelopeIcon} boxSize={'24px'} margin={'auto'} position={'relative'} textColor={'green.grey350'}/>
                        </Flex>
                    </InputLeftElement>                           
                     <Input
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                bg="white"
                                color="gray.800"
                                borderRadius="xl"
                                p="4"
                                pl={'42px'}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <InputGroup>
                        <InputLeftElement width={'42px'}>
                        <Flex justifyContent={'center'} alignItems={'center'} height={'64px'}>
                        <Icon as={LockClosedIcon} boxSize={'24px'} margin={'auto'} position={'relative'} textColor={'green.grey350'}/>
                        </Flex>
                    </InputLeftElement>                           
                     <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                bg="white"
                                color="gray.800"
                                borderRadius="xl"
                                p="4"
                                pl={'42px'}
                            />
                            <InputRightElement >
                                <Button
                                    variant="ghost"
                                    onClick={() => setShowPassword((showPassword) => !showPassword)}
                                    backgroundColor="transparent"
                                    _hover={{ bg: 'none' }}
                                    color="black"
                                    // h={'100%'}
                                    // w={'100%'}
                                >
                                     <Icon as={showPassword ? EyeIcon : EyeSlashIcon} boxSize="24px" />
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Flex justifyContent="center" mb="25px" mt={'20px'}>
                        <Link to="/password-reset-request" style={{ marginLeft: "5px" }}>
                            <Text color={'white'} display="flex" fontSize="14px">Forget&nbsp;<b>Password</b>?</Text>
                        </Link>
                    </Flex>
                    
                    <Button width={'100%'} height={'48px'} borderRadius={'16px'} fontSize={'24px'} border={'1px solid white'} fontWeight={'700'} color={'white'} bg={'green'} _active={{opacity:'70%'}} type="submit">SIGN IN</Button>
                </Box>
                </form>
                <Box flex={['none', 'none', '1']} p={['6', '6', '6']}>
                    <Flex h={'100%'} justifyContent="center" alignItems="center" flexDirection="column">
                        <Text fontWeight="bold" fontSize="sm" mb="2">Or Sign in with</Text>
                        <Button bgColor={'white'} color={'black'} size="lg" mb="2" onClick={onLoginWithGoogle}>
                            <Image
								src={googleImg}
								w={"15px"}
								mr={"7px"}
								alt="Google Image"
							/>Google</Button> 
                   <Text fontWeight="bold" fontSize="sm" mb="2">Don't have an account?</Text>
                   <Link to="/register" style={{ marginLeft: "5px" }}>
                        <Button color={"white"} bg={"green"} borderRadius={20} _hover={{bgColor:'red'}}>Register</Button>
					</Link>
                    </Flex>
                </Box>
            </Stack>
            <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
            <ErrorModal isOpen={isErrorModalOpen} onClose={closeErrorModal} />
        </Flex>
        </Box>
    </>
  )
}

export default Signin