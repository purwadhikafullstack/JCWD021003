import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {  Box,  Text,  Button,  Select,  FormControl,  FormLabel,  Modal,  ModalOverlay,  ModalContent,
  ModalHeader,  ModalCloseButton,  ModalBody,  ModalFooter,  Grid,  GridItem,  Image,
  Flex,} from '@chakra-ui/react';
import currencyFormatter from 'currency-formatter';
import { Navbar } from '../../components/Navbar';


const CheckoutPage = () => {
  const location = useLocation();
  const cartData = location.state?.cartData || [];
  const [buyerAddress, setBuyerAddress] = useState(''); 
  const [isChangeAddressModalOpen, setIsChangeAddressModalOpen] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('');
  const formatCurrency = (amount) => {return currencyFormatter.format(amount, { code: 'IDR' });};

  useEffect(() => {
  }, []); 

  // Calculate total cost
  const totalCost = cartData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // Handle opening the change address modal
  const handleOpenChangeAddressModal = () => {
    setIsChangeAddressModalOpen(true);
  };

  // Handle closing the change address modal
  const handleCloseChangeAddressModal = () => {
    setIsChangeAddressModalOpen(false);
  };

  // Handle changing the buyer address
  const handleChangeBuyerAddress = (newAddress) => {
    setBuyerAddress(newAddress);
    handleCloseChangeAddressModal();
  };

  const deliveryOptions = ['Standard Delivery', 'Express Delivery'];

  return (
    <Box bgColor={'#F0F3F7'}>
        <Navbar/>
        <Text p={"10px 20px"} fontSize={"30px"} fontWeight={900}> Delivery </Text>
    <Grid templateColumns="2fr 1fr" gap={8} h={'100vh'} px={'20px'}>
      {/* Left Column */}
      <GridItem>
        <Box bgColor={'#F0F3F7'}>
          <Box bgColor={'white'} mb={"20px"} p={"20px"} borderRadius={'20px'}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Buyer Address:
            </Text>
            <Text py={'25px'}>{buyerAddress || 'Not set'}</Text>
            <Button  bgColor="green" color={"white"} onClick={handleOpenChangeAddressModal}>
              Change Address
            </Button>
          </Box>

          {/* Change Address Modal */}
          <Modal
            isOpen={isChangeAddressModalOpen}
            onClose={handleCloseChangeAddressModal}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Change Address</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Enter New Address:</FormLabel>
                  <textarea
                    rows="4"
                    cols="50"
                    value={buyerAddress}
                    onChange={(e) => setBuyerAddress(e.target.value)}
                  ></textarea>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  onClick={() => handleChangeBuyerAddress(buyerAddress)}
                >
                  Save
                </Button>
                <Button onClick={handleCloseChangeAddressModal}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Cart Items */}
          <Box bgColor={'white'} padding={"20px"} borderRadius={'20px'}>
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
                  borderRadius={"10px"} p={'5px'}
                  m={'10px'}
                />
              </Box>

              {/* Right part product details */}
              <Box>
                <Text>{item.name}</Text>
                <Text>Quantity: {item.quantity}</Text>
                <Text>Price: {formatCurrency(item.price)}</Text>
                <FormControl>
            <Select
              placeholder="Select delivery option"
              value={selectedDeliveryOption}
              onChange={(e) => setSelectedDeliveryOption(e.target.value)}
            >
              {deliveryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </FormControl>
              </Box>
            </Flex>
          ))}
          </Box>
        </Box>
      </GridItem>

      {/* Right Column */}
      <GridItem>
        <Box bgColor={"white"} padding={"20px"} borderRadius={'20px'}>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Shopping Summary:
          </Text>
          <Text>Total Price: {formatCurrency(totalCost)}</Text>

          {selectedDeliveryOption && <Text>Total Delivery Fee: $</Text>}


          <Text>Shopping Total: {formatCurrency(totalCost)}</Text>

          {/* Payment Button */}
          <Button bgColor="green" color={"white"} mt={4}>
            Proceed to Payment
          </Button>
        </Box>
      </GridItem>
    </Grid>
    </Box>
  );
};
export default CheckoutPage;