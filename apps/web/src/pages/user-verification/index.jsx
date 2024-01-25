import { AbsoluteCenter, Box, Button, Flex, FormControl, FormErrorMessage, Icon, Image, Input, InputGroup, InputLeftElement, InputRightElement, Text, useDisclosure, IconButton } from "@chakra-ui/react"
import model from '../../assets/icon2.png'
import {LockClosedIcon, EyeSlashIcon, EyeIcon} from '@heroicons/react/24/outline'
import { useFormik } from "formik"
import { verification } from "./services/editUser"
import { PasswordSchema } from "./services/Validation"
import { useState } from "react"
import { SuccessModal } from "./services/PopModal"
import { ErrorModal } from "./services/PopModal"
import { BeatLoader } from "react-spinners"
import {useNavigate, Link} from 'react-router-dom'
import { IoHome } from "react-icons/io5";

function Verification() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const { isOpen: isSuccessModalOpen, onOpen: openSuccessModal, onClose: closeSuccessModal } = useDisclosure();
    const { isOpen: isErrorModalOpen, onOpen: openErrorModal, onClose: closeErrorModal } = useDisclosure();
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "white",
    };
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues:{
            password: "",
            confirmationPassword:"",
        },
        validationSchema: PasswordSchema,
        onSubmit: async (values) => {
            try{
                await verification(values.password, setLoading, openSuccessModal, openErrorModal);    
            } catch (err){
                console.log(err.message);
            }
            formik.resetForm()
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
                <Text fontWeight={'800'} color={'green'} textAlign={'center'} fontSize={'42px'} marginBottom={'48px'} lineHeight={'1.0'}>SET PASSWORD</Text>
                <form onSubmit={formik.handleSubmit}>
                <FormControl 
                isInvalid={ formik.touched.password && formik.errors.password}
                marginBottom={'32px'}>
                    <InputGroup marginBottom={'8px'}>
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        required
                        placeholder="enter password"
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
                    {formik.touched.password && formik.errors.password && (
						<FormErrorMessage>
							{formik.errors.password}
						</FormErrorMessage>)}
                </FormControl>
                
                <FormControl 
                isInvalid={formik.touched.confirmationPassword && formik.errors.confirmationPassword}
                marginBottom={'32px'}>    
                    <InputGroup marginBottom={'8px'}>
                    <Input
                        type={showPasswordConfirmation ? "text" : "password"}
                        name="confirmationPassword"
                        placeholder="Password confirmation"
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
							onClick={() => setShowPasswordConfirmation((showPasswordConfirmation) => !showPasswordConfirmation)}
							backgroundColor={"transparent"}
                            height={'64px'}
                            _hover={'none'}
                            color={'#707070'}
						>
							{showPasswordConfirmation ? <Icon as={EyeIcon} boxSize={'24px'}/> : <Icon as={EyeSlashIcon} boxSize={'24px'}/>}
						</Button>
					</InputRightElement>
                    </InputGroup>
                    {formik.touched.confirmationPassword && formik.errors.confirmationPassword && (
						<FormErrorMessage>
							{formik.errors.confirmationPassword}
						</FormErrorMessage>)}
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
                    <Button width={'100%'} height={'68px'} borderRadius={'16px'} fontSize={'24px'} fontWeight={'700'} color={'white'} bg={'green'} _hover={{bg: '#f50f5a'}} _active={{opacity:'70%'}} type="submit">CONFIRM</Button>
                )}
                <Box>
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
                </form>
                <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
                <ErrorModal isOpen={isErrorModalOpen} onClose={closeErrorModal} />
                </Box>
            </Flex>
        </Flex>
    </>
  )
}

export default Verification