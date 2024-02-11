import { Box, Button, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { findUserAddress } from "../../services/getUserAddress";
import { useSelector } from "react-redux";
import FormEditAddress from "../edit-address";
import UpdateMainAddress from "../update-MainAddress";
import DeleteUserAddress from "../delete-address";
function AddressList (){
    
    const [address, setAddress] = useState([])
    const user = useSelector((state) => state.AuthReducer.user);
    
        const fetchData = async () => {
            try {
                const fetchAddresses = await findUserAddress(user.id)
                setAddress(fetchAddresses)
            } catch (err){
                console.log(err);
            }
        }
    
    useEffect(() => {
        fetchData()
    }, [user.id])

    return (
        <>
        {address.map((address) => ( 
            <Flex key={address.id}
            borderRadius={'12px'}
            border={'1px solid #818181'}
            bg={'white'}
            padding={'24px'}
            mt={'24px'}
            mb={'24px'}
            >
                <Flex 
                width={'100%'}
                flexWrap={'wrap'}
                flexDir={'column'}>
                    <Flex gap={'24px'}
                    alignItems={'center'}
                    mb={'24px'}>
                        <Text fontSize={'16px'}
                              fontWeight={'700'}
                              color={'black'}>
                            {address.fullName} 
                        </Text>
                        {address.isMainAddress ? 
                        <Box padding={'10px'}
                             bg={'green'}
                             borderRadius={'8px'}
                             fontSize={'16px'}
                             fontWeight={'700'}
                             color={'white'}>
                            Main
                        </Box>
                        : <></>}
                    </Flex>
                    <Text fontSize={'14px'}
                          fontWeight={'400'}
                          mb={'16px'}>
                        {address.phoneNumber} 
                    </Text>
                    <Text fontSize={'14px'}
                          fontWeight={'600'}
                          color={'brand.grey350'}>
                        {address.specificAddress ?? ''}, {address.City.name}, {address.City.Province.name} {address.postalCode ?? ''} 
                    </Text>
                </Flex>
                <Flex justifyContent={'flex-end'}
                gap={'12px'} flexDirection={['column', null, null, null, 'row']}>
                    <Flex justifyContent={'flex-end'}
                    flexDir={'column'}>
                        <FormEditAddress 
                        id={address.id}
                        specificAddress={address.specificAddress}
                        cityId={address.cityId}
                        fullName={address.fullName}
                        phoneNumber={address.phoneNumber}
                        postalCode={address.postalCode}
                        provinceId={address.City.Province.id}
                        onAddressUpdated={fetchData}
                        />
                    </Flex>
                    <Flex justifyContent={'flex-end'}
                    flexDir={'column'}>
                        <Menu>
                            <MenuButton as={Button}
                            variant={'outline'}
                            border={'1px solid #8D8B8B'}
                            color={'green'}
                            fontSize={'14px'}
                            fontWeight={'700'}
                            padding={'12px 16px'}
                            _hover={'none'}
                            _active={'none'}>
                                <Text>•••</Text>
                            </MenuButton>
                            <MenuList>
                                <MenuItem>
                                    <UpdateMainAddress 
                                    id={address.id} 
                                    userId={user.id}
                                    onUpdatedMainAddress={fetchData}/>
                                </MenuItem>
                                <MenuItem>
                                    <DeleteUserAddress id={address.id}
                                    onDeletedAddress={fetchData}/>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                    
                </Flex>
            </Flex>
            ))}
        </>
    )
}

export default AddressList