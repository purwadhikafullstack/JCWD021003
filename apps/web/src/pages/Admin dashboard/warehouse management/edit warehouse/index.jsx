import { Box, Button, Flex, Input, Select, Text,Breadcrumb, BreadcrumbItem, BreadcrumbLink, HStack, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HomeIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@chakra-ui/icons'
// import ModalNotif from "./components/notif-modal";
import MapWarehouse from "../create warehouse page/components/map";
// import FormInitialWarehouse from "./components/form-disable";
import { Navbar } from "../../../../components/Navbar";
import { Footer } from "../../../../components/Footer";
import { findOpenCageAndCity } from "../services/getWarehouse";
import FormEditWarehouse from "./components/edit form";
import { useLocation } from 'react-router-dom';

function EditWarehouse(){

    const [formLocation, setFormLocation] = useState(false)
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [address, setAddress] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [marker, setMarker] = useState(false)
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const location = useLocation();
    const warehouse = location.state?.warehouse;

    console.log('cek passing data',warehouse)
    console.log(
        'lat',warehouse.WarehouseAddress.latitude,
        'long',warehouse.WarehouseAddress.longitude,
        'address',address)
    
    useEffect (() => {
            setLatitude(warehouse.WarehouseAddress.latitude);
            setLongitude(warehouse.WarehouseAddress.longitude)

    }, [])

    useEffect(() => {
        const fetchAddress = async () => {
          if (latitude && longitude) {
            try {
              const fetchedAddress = await findOpenCageAndCity(latitude, longitude);
              setAddress(fetchedAddress);
              setFormLocation(true)
              setSelectedAddress('')
              setMarker(true);
            } catch (error) {
              console.error("Error fetching address:", error);
            }
          }
        };
    
        fetchAddress();
      }, [latitude, longitude]);

    // const handleClick = async () => {
    //     try {
    //         setFormCurrentLocation(true)
    //         setSelectedAddress('')
    //         setMarker(true)
    //     } catch (error) {
    //         console.error("Error fetching address:", error);
    //     }
    // };

    return (
        <Box bg={'#F1F1F1'}
        height={'100%'}>
            <Navbar/>
            <Box padding={{base: '0px 10px', md:'0px 100px'}}
             marginBottom={'150px'}>
                {/* <ModalNotif/> */}
                <Flex className="create-address-top"
                flexDir={'column'}
                gap={'16px'}
                marginTop={'24px'}
                marginBottom={'40px'}>
                    <Text fontSize={{base: '16px', md:'24px'}}
                    fontWeight={'700'}>Edit Warehouse</Text>
                    <Flex>
                    <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
      <BreadcrumbItem >
          <BreadcrumbLink href="/">
          <Icon as={HomeIcon} boxSize={'16px'} color={'#838383'} />
          </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
          <BreadcrumbLink color={'brand.lightred'}
          fontWeight={'700'}
          fontSize={'12px'} href="/admin-dashboard/warehouse-management">
              Manage Warehouse
          </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color={'brand.lightred'}
          fontWeight={'700'}
          fontSize={'12px'}>
              Edit Warehouse
          </BreadcrumbLink>
      </BreadcrumbItem>
  </Breadcrumb>
                    </Flex>
                </Flex>
                <Box width={'100%'}
                bg={'white'} 
                padding={'24px'}
                mb={'40px'}
                borderRadius={'16px'}>
                    {/* <Button color='brand.lightred' 
                    borderColor={'brand.lightred'} 
                    variant={'outline'} 
                    padding={'9px 11px'}
                    mb={'40px'}
                    _hover={{
                        opacity: '80%'
                    }}
                    _active={{
                        opacity: '50%'
                    }}
                    onClick={handleClick}
                    >
                        <Text fontSize={{base: '13px', md: '16px'}}>
                        Use your current location
                        </Text>
                    </Button> */}
                    <Box 
                    className="map"
                    width={'100%'}
                    height={'474px'}
                    bg={'green.100'}
                    marginBottom={'33px'}>
                        <MapWarehouse lat={latitude} lng={longitude} 
                        setSelectedAddress={setSelectedAddress} 
                        // setFormCurrentLocation={setFormCurrentLocation} 
                        marker={marker}
                        setMarker={setMarker}
                        setLat={setLat}
                        setLng={setLng}
                        />
                    </Box>
                        <FormEditWarehouse 
                        address={selectedAddress || address} 
                        lat={lat || latitude} 
                        lng={lng || longitude}/> 
                </Box>
            </Box>
            <Footer/>
        </Box>
    )
}

export default EditWarehouse