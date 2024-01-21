import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { createUserAddress } from "../../services/createUserAddress";
import { getCity, getProvince } from "../../services/getUserAddress";

function FormCreateAddress () {
    const [provinceList, setProvinceList] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("")
    const [citylist, setCityList] = useState([])
    const [selectedCity, setSelectedCity] = useState("")

    const user = useSelector((state) => state.AuthReducer.user);


    useEffect(() => {
        getProvince().then((data) => {
            setProvinceList(data);
            // console.log(data)
        });
    }, []);


    useEffect(() => {
        if (selectedProvince !== "") {
            // console.log('id province',selectedProvince)
            getCity(selectedProvince).then((data) => {
                setCityList(data);
                // console.log('set city',data);
            });
        }
    }, [selectedProvince]);

    const formik = useFormik({

        initialValues:{
            specificAddress:"", 
            cityId: "", 
            fullName:"", 
            phoneNumber:""
        },
        onSubmit: async (values, {resetForm}) => {
            try{
                console.log("Formik Submission Values:", values);
                await createUserAddress(user.id, values.specificAddress, values.cityId, values.fullName, values.phoneNumber);    
            } catch (err){
                console.log(err.message);
            }
            resetForm({values:
                {specificAddress:"", 
                cityId: "", 
                fullName:"", 
                phoneNumber:"",
                }})
        }
    }) 

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Flex>
                    <Box mr={"20px"}>  
                        <Text fontWeight={700}>Full Name</Text>
                            <Input
                            name="fullName"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            placeholder="User Name"/>
                            <Text fontWeight={700}>ADDRESS</Text>
                            <Text fontWeight={700}>Province</Text>
                            <Select value={selectedProvince}
                                    onChange={(e) => setSelectedProvince(e.target.value)}>
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
                        <Box>
                            <Text fontWeight={700}>Phone Number</Text>
                            <Input
                            name="phoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            placeholder="Phone Number"
                            mb={"50px"}/>
                            <Text fontWeight={700}>Address</Text>
                            <Input name="specificAddress"
                            value={formik.values.specificAddress}
                            onChange={formik.handleChange}
                            placeholder="Ex : Street, Residence, number of house" mb={"10px"}/>

                             <Button colorScheme="red" type="submit">Save</Button>

                        </Box>
                </Flex>
            </form>
        </>
    )
}

export default FormCreateAddress