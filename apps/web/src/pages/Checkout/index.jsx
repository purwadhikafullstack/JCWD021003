import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { findUserAddress } from '../user-address/services/getUserAddress';
import { getNearestWarehouse} from './services/ShippingCostApi';
import { Box,  Text,  Button,  Select,  FormControl,  FormLabel,  Modal,
  ModalOverlay,  ModalContent,  ModalHeader,  ModalCloseButton,  ModalBody,
  ModalFooter,  Grid,  GridItem,  Image,  Flex,  Icon,} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import currencyFormatter from 'currency-formatter';
import { Navbar } from '../../components/Navbar';
import ChangeAddressModal from './components/Modal ChangeAddress';
import { MapPinIcon } from '@heroicons/react/24/outline';
import ShippingCost from './components/shippingCost';

const CheckoutPage = () => {
  const location = useLocation();
  const cartData = location.state?.cartData || [];
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [nearestWarehouse, setNearestWarehouse] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);
  const user = useSelector((state) => state.AuthReducer.user);

  const formatCurrency = (amount) => {
    return currencyFormatter.format(amount, { code: 'IDR' });
  };

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

  //   console.log('data alamat',selectedAddress);
  useEffect(() => {
    fetchData();
  }, [user.id]);

  const fetchWarehouse = async () => {
    try {
      const fetchNearestWarehouse = await getNearestWarehouse(
        selectedAddress?.latitude,
        selectedAddress?.longitude,
      );
      setNearestWarehouse(fetchNearestWarehouse);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedAddress) {
      fetchWarehouse();
    }
  }, [selectedAddress]);
  console.log('ini warehouse terdekat', nearestWarehouse);

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
  console.log('passing', shippingCost);
  return (
    <Box bgColor={'#F0F3F7'} h={'fit-content'}>
      <Navbar />
      <Text p={'10px 20px'} fontSize={'30px'} fontWeight={900}>
        {' '}
        Delivery{' '}
      </Text>
      <Grid templateColumns="2fr 1fr" gap={8} h={'100%'} px={'20px'}>
        {/* Left Column */}
        <GridItem>
          <Box bgColor={'#F0F3F7'}>
            <Box bgColor={'white'} mb={'20px'} p={'20px'} borderRadius={'20px'}>
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Delivery Address:
              </Text>
              {/* <Box display={'flex'} alignItems={'center'} gap={'8px'}>
                <Icon as={MapPinIcon} fontSize={'22px'} color={'#CD0244'} />
                <Text fontFamily={'body'} fontWeight={'700'} fontSize={'16px'}>
                    Delivery Address
                </Text>
            </Box> */}
              {selectedAddress && (
                <Flex
                  key={selectedAddress?.id}
                  borderRadius={'12px'}
                  border={'1px solid #818181'}
                  bg={'white'}
                  padding={'24px'}
                  mt={'24px'}
                  mb={'24px'}
                >
                  <Flex width={'100%'} flexWrap={'wrap'} flexDir={'column'}>
                    <Flex gap={'24px'} alignItems={'center'} mb={'24px'}>
                      <Text
                        fontSize={'16px'}
                        fontWeight={'700'}
                        color={'black'}
                      >
                        {selectedAddress?.fullName}
                      </Text>
                      {/* badge main/ */}
                      {selectedAddress?.isMainAddress ? (
                        <Box
                          padding={'10px'}
                          bg={'green'}
                          borderRadius={'8px'}
                          fontSize={'16px'}
                          fontWeight={'700'}
                          color={'white'}
                        >
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

            {/* Cart Items */}
            <Box bgColor={'white'} padding={'20px'} borderRadius={'20px'}>
              <Text fontSize="xl" fontWeight="bold">
                Cart Items:
              </Text>
              {cartData.map((item) => (
                <Flex key={item.id} mb={4}>
                  {/* Left part image */}
                  <Box mr={10}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      boxSize="50px"
                      objectFit="scale-down"
                      border={'1px solid black'}
                      borderRadius={'10px'}
                      p={'5px'}
                      m={'10px'}
                    />
                  </Box>

                  {/* Right part product details */}
                  <Box>
                    <Text>{item.name}</Text>
                    <Text>Quantity: {item.quantity}</Text>
                    <Text>Price: {formatCurrency(item.price)}</Text>
                  </Box>
                </Flex>
              ))}
              <Box w={'100%'}>
                {/* <FormControl>
                  <Select
                    w={'50%'}
                    placeholder="Select Courier"
                    value={selectedDeliveryOption}
                    onChange={(e) => setSelectedDeliveryOption(e.target.value)}
                  >
                    {deliveryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </FormControl> */}
                <ShippingCost
                  nearestWarehouse={nearestWarehouse}
                  selectedAddress={selectedAddress}
                  updateShippingCost={updateShippingCost}
                />
              </Box>
            </Box>
          </Box>
        </GridItem>

        {/* Right Column */}
        <GridItem>
          <Box bgColor={'white'} padding={'20px'} borderRadius={'20px'}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Shopping Summary:
            </Text>
            <Text>Total Price: {formatCurrency(totalCost)}</Text>

            {hasShippingFee && (
              <Text>Total Delivery Fee: {formatCurrency(shippingCost)}</Text>
            )}
            <Text>Shopping Total: {formatCurrency(totalCostWithShipping)}</Text>

            {/* Payment Button */}
            <Button bgColor="green" color={'white'} mt={4}>
              Proceed to Payment
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};
export default CheckoutPage;
