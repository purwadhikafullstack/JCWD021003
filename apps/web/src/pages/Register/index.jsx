import { AbsoluteCenter, Box, Button, Divider, Flex, FormControl, FormErrorMessage, Icon, Image, Input, InputGroup, InputLeftElement, Text, useDisclosure, IconButton } from "@chakra-ui/react"
import model from '../../assets/icon2.png'
import { UserCircleIcon, EnvelopeIcon} from '@heroicons/react/24/outline'
// import { instagram, gmail } from "../../assets/Icons/Icons"
import { useFormik } from "formik"
import { register } from "./services/registerUser"
import { SuccessModal, ErrorModal } from "./services/PopUpModal"
import { BeatLoader } from "react-spinners";
import { useState } from "react"
import { registerScheme } from "./services/validation"
import { IoHome } from "react-icons/io5";
import {Link} from 'react-router-dom'
// import { signInWithGoogle } from '../../firebase';

function Signup({setOpenTab}) {
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
            username:"",
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
    }) 

     return (
    <>
        <Flex height={'100vh'} width={'100%'} boxShadow={'base'}>
            <Box width={'50%'} height={'100vh'} position={'relative'}>
                <Image borderTopRightRadius={'20'} borderBottomRightRadius={'20'} src={model} width={'730px'} height={'100vh'} objectFit={'cover'} opacity={'75%'}/>
                {/* <AbsoluteCenter>
                    <Image src={logo}/>
                </AbsoluteCenter> */}
            </Box>
            <Flex justifyContent={'center'} alignItems={'center'} alignContent={'center'} width={'50%'} margin={'50'}>
                <Box width={'450px'}>
                <Text fontWeight={'800'} color={'green'} textAlign={'center'} fontSize={'42px'} marginBottom={'40px'}>SIGN UP</Text>
                <form onSubmit={formik.handleSubmit}>
                <FormControl 
                isInvalid={(formik.touched.username && formik.errors.username)}
                marginBottom={'32px'}>
                    <InputGroup marginBottom={'8px'}>
                    <Input
                        name="username"
                        placeholder="Username"
                        value={formik.values.username}
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
                        <Icon as={UserCircleIcon} boxSize={'24px'} margin={'auto'} position={'relative'} textColor={'green.grey350'}/>
                        </Flex>
                    </InputLeftElement>
                    </InputGroup>
                    {formik.touched.username &&
					formik.errors.username && (
						<FormErrorMessage>
							{formik.errors.username}
						</FormErrorMessage>
					)}
                </FormControl>
                
                <FormControl 
                isInvalid={(formik.touched.email && formik.errors.email)}
                marginBottom={'32px'}>    
                    <InputGroup marginBottom={'8px'}>
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
                    {formik.touched.email && formik.errors.email && (
						<FormErrorMessage>
							{formik.errors.email}
						</FormErrorMessage>
					)}
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
                    <Button width={'100%'} height={'68px'} borderRadius={'16px'} fontSize={'24px'} fontWeight={'700'} color={'white'} bg={'green'} _hover={{bg: 'blue.100'}} _active={{opacity:'70%'}} type="submit">SIGN UP</Button>
                )}
                
                </form>
                <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
                <ErrorModal isOpen={isErrorModalOpen} onClose={closeErrorModal} />
                            
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
                </Box>
            </Flex>
        </Flex>
    </>
  )
}

export default Signup