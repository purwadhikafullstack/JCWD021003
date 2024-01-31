import { Box, Button, Flex, Input, Select, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { createUserAddress} from "../../services/createUserAddress";
import { getCity, getProvince } from "../../services/getUserAddress";
import { useNavigate } from "react-router-dom";
import { SuccessModal,ErrorModal } from "./services/popModal";
import axios from "axios";

function FormCreateAddress () {
    const [provinceList, setProvinceList] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("")
    const [citylist, setCityList] = useState([])
    const [selectedCity, setSelectedCity] = useState("")
    const { isOpen: isSuccessModalOpen, onOpen: openSuccessModal, onClose: closeSuccessModal } = useDisclosure();
    const { isOpen: isErrorModalOpen, onOpen: openErrorModal, onClose: closeErrorModal } = useDisclosure();
    const user = useSelector((state) => state.AuthReducer.user);
    const navigate = useNavigate();

    useEffect(() => {
        getProvince().then((data) => {
            setProvinceList(data);
        });
    }, []);


    useEffect(() => {
        if (selectedProvince !== "") {
            getCity(selectedProvince).then((data) => {
                setCityList(data);
            });
        }
    }, [selectedProvince]);

    const formik = useFormik({

        initialValues:{
            specificAddress:"", cityId: "", fullName:"", 
            phoneNumber:"", postalCode: ""
        },
        onSubmit: async (values) => {
            try{
               await createUserAddress(user.id, values.specificAddress, values.cityId, values.fullName, values.phoneNumber,values.postalCode, openSuccessModal, openErrorModal); 
                formik.resetForm();   
            } catch (err){
                console.log(err.message);
            }
        }
    }) 

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Flex>
                    <Box mr={"20px"}> 
                         <Text>Contact</Text> 
                        <Text fontWeight={700}>Full Name</Text>
                            <Input
                            name="fullName"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            variant={'filled'}
                            placeholder="User Name"/>
                            <Text fontWeight={700}>ADDRESS</Text>
                            <Text fontWeight={700}>Province</Text>
                            <Select value={selectedProvince}
                                    onChange={(e) => setSelectedProvince(e.target.value)} mb={'8px'}variant={'filled'}>
                                <option value="">Select a Province</option>
                                {provinceList?.map((province) => (
                                    <option key={province.id} value={province.id}>
                                        {province.name}
                                    </option>
                                ))}
                            </Select>
                            <Text fontWeight={700}>City</Text>
                            <Select 
                            name="cityId"
                            variant={'filled'}
                            onChange={(e) => {
                                setSelectedCity(e.target.value);
                                formik.handleChange(e);
                            }}>
                                <option value="">Select a city</option>
                                {citylist?.map((city) => (
                                    <option key={city.id} 
                                    value={city.id}
                                    >
                                        {city.name}
                                    </option>
                                ))}
                            </Select>
                        </Box>
                        <Box w={"50%"} mt={"25px"}>
                            <Text fontWeight={700}>Phone Number</Text>
                            <Input
                            name="phoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            placeholder="Phone Number"
                            variant={'filled'}
                            w={"50%"}
                            mb={"25px"}/>

                            <Text fontWeight={700}>Address</Text>
                            <Input name="specificAddress"
                            value={formik.values.specificAddress}
                            onChange={formik.handleChange}
                            variant={'filled'}
                            placeholder="Ex : Street, Residence, number of house" mb={"10px"}/>

                             <Text fontSize={'16px'}
                            fontWeight={'700'}
                            color={'brand.grey350'}
                            >
                                Postal Code
                            </Text>
                            <Input
                            placeholder="Type a postal code"
                            mb={'24px'}
                            variant={'filled'}
                            name="postalCode"
                            w={"50%"}
                            value={formik.values.postalCode}
                            onChange={formik.handleChange}
                            // border={"1px solid grey"}
                            />

                             <Button colorScheme="red" type="submit" ml={"10px"}>Save</Button>
                             <Button colorScheme="red" onClick={()=>navigate(-1)} ml={"10px"}>Cancel</Button>

                             <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
                             <ErrorModal isOpen={isErrorModalOpen} onClose={closeErrorModal} />
                        </Box>
                </Flex>
            </form>
        </>
    )
}

export default FormCreateAddress