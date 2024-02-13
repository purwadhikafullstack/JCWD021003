import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { findUserAddress, getCityName } from '../user-address/services/getUserAddress';
import { getNearestWarehouse } from './services/ShippingCostApi';
import {  Box, Text,  Button,  Grid,  GridItem,  Image,  Flex,  Icon,Center} from '@chakra-ui/react';
import { useSelector,useDispatch } from 'react-redux';
import currencyFormatter from 'currency-formatter';
import { Navbar } from '../../components/Navbar';
import ChangeAddressModal from './components/Modal ChangeAddress';
import ShippingCost from './components/shippingCost';
import { Footer } from '../../components/Footer';
import { clearCart } from '../../redux/reducer/cartReducer';
import toast from 'react-hot-toast'

const CheckoutPage = () => {
  const location = useLocation();
  const cartData = location.state?.cartData || [];
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [nearestWarehouse, setNearestWarehouse] = useState(null);
  const [Warehouse, setWarehouse] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);
  const user = useSelector((state) => state.AuthReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const formatCurrency = (amount) => {return currencyFormatter.format(amount, { code: 'IDR' }); };

  const fetchData = async () => {
    try {
      const fetchAddresses = await findUserAddress(user.id);
      const mainAddress = fetchAddresses.find(
        (address) => address.isMainAddress,
      );
      setSelectedAddress(mainAddress);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user.id]);

  const fetchWarehouse = async () => {
    try {
      const fetchNearestWarehouse = await getNearestWarehouse(
        selectedAddress?.latitude,
        selectedAddress?.longitude,
      );
      const nearestWarehouse = await getCityName(fetchNearestWarehouse)
      setNearestWarehouse(fetchNearestWarehouse);
      setWarehouse(nearestWarehouse)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedAddress) {
      fetchWarehouse();
    }
  }, [selectedAddress]);

  // Calculate total cost
  const totalCost = cartData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const hasShippingFee = shippingCost !== undefined;

  const totalCostWithShipping = hasShippingFee
    ? totalCost + shippingCost
    : totalCost;

  const updateShippingCost = (cost) => {
    setShippingCost(cost);
  };

    const handleProceedToPayment = () => {
      if (!hasShippingFee) {
        toast.error('Shipping cost is not available');
        return;
      }
      dispatch(clearCart());
      toast.success('Transaction Success')
      navigate('/')
    }; 
    console.log(nearestWarehouse)
  return (
    <Box bgColor={'#F0F3F7'} h={'fit-content'} minH={'100vh'} w={'100vw'} minW={'780px'}>
      <Navbar />
      <Text p={'10px 20px'} fontSize={'30px'} fontWeight={900}>
        Delivery
      </Text>
      <Grid templateColumns="2fr 1fr" gap={8} h={'100%'} px={'20px'}>
        <GridItem>
          <Box bgColor={'#F0F3F7'}>
            <Box bgColor={'white'} mb={'20px'} p={'20px'} borderRadius={'20px'}>
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Delivery Address:
              </Text>
              {selectedAddress && (
                <Flex
                  key={selectedAddress?.id}                  borderRadius={'12px'}                  border={'1px solid #818181'}
                  bg={'white'}                  padding={'24px'}                  mt={'24px'}                  mb={'24px'}  >
                  <Flex width={'100%'} flexWrap={'wrap'} flexDir={'column'}>
                    <Flex gap={'24px'} alignItems={'center'} mb={'24px'}>
                      <Text                        fontSize={'16px'}                        fontWeight={'700'}                        color={'black'}                      >
                        {selectedAddress?.fullName}
                      </Text>
                      {/* badge main/ */}
                      {selectedAddress?.isMainAddress ? (
                        <Box                          padding={'10px'}                          bg={'green'}                          borderRadius={'8px'}
                          fontSize={'16px'}                          fontWeight={'700'}                          color={'white'} >
                          Main
                        </Box>
                      ) : (
                        <></>
                      )}
                    </Flex>
                    <Text fontSize={'14px'} fontWeight={'400'} mb={'16px'}>
                      {selectedAddress?.phoneNumber}
                    </Text>
                    <Text
                      fontSize={'14px'}
                      fontWeight={'600'}
                      color={'brand.grey350'}
                    >
                      {selectedAddress.specificAddress ?? ''},{' '}
                      {selectedAddress.City.name},{' '}
                      {selectedAddress.City.Province.name}{' '}
                      {selectedAddress.postalCode ?? ''}
                    </Text>
                  </Flex>
                  <Flex justifyContent={'flex-end'} gap={'12px'}>
                    <Flex justifyContent={'flex-end'} flexDir={'column'}>
                      <ChangeAddressModal
                        setSelectedAddress={setSelectedAddress}
                        selectedAddress={selectedAddress}
                      />
                    </Flex>
                  </Flex>
                </Flex>
              )}
            </Box>
            <Box bgColor={'white'}    padding={'20px'}    borderRadius={'20px'}    mb={'20px'}  >
              <Text fontSize="xl" fontWeight="bold">
                Cart Items:
              </Text>
              {cartData.map((item) => (
                <Flex key={item.id} mb={4}>
                  <Box mr={10}>
                    <Image                      src={item.image}                      alt={item.name}                      boxSize="50px"                      objectFit="scale-down"
                      border={'1px solid black'}                      borderRadius={'10px'}                      p={'5px'}                      m={'10px'}  />
                  </Box>
                  <Box>
                    <Text>{item.name}</Text>
                    <Text>Quantity: {item.quantity}</Text>
                    <Text>Price: {formatCurrency(item.price)}</Text>
                  </Box>
                </Flex>
              ))}
              <Box w={'100%'}>
                <ShippingCost
                  nearestWarehouse={nearestWarehouse}
                  selectedAddress={selectedAddress}
                  updateShippingCost={updateShippingCost} />
                   {hasShippingFee && (
             <Box margin={'20px'} fontWeight={700}> Dikirim dari gudang {Warehouse}</Box>
            )}
              </Box>
            </Box>
          </Box>
        </GridItem>
        <GridItem>
          <Box bgColor={'white'} padding={'20px'} borderRadius={'20px'}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Shopping Summary:
            </Text>
            <Flex justifyContent="space-between" alignItems="center" mb={2}>
              <Text>Total Price:</Text>
              <Text>{formatCurrency(totalCost)}</Text>
            </Flex>
            {hasShippingFee && (
              <Flex justifyContent="space-between" alignItems="center" mb={2}>
                <Text>Total Delivery Fee:</Text>
                <Text>{formatCurrency(shippingCost)}</Text>
              </Flex>
            )}
            <Flex justifyContent="space-between" alignItems="center" mb={2}>
              <Text>Shopping Total:</Text>
              <Text>{formatCurrency(totalCostWithShipping)}</Text>
            </Flex>
            <Center>
            <Button bgColor="green" color={'white'} mt={4} onClick={handleProceedToPayment} disabled={!shippingCost}>
              Proceed to Payment
            </Button>
            </Center>
          </Box>
        </GridItem>
      </Grid>
      <Footer/>
    </Box>
  );
};
export default CheckoutPage;