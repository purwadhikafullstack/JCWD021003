import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCart, removeFromCart,updateQuantity } from '../../redux/reducer/cartReducer';
import { Flex, Box, Heading, Text, HStack, Divider, Image,IconButton,Button } from '@chakra-ui/react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import currencyFormatter from 'currency-formatter';
import { Navbar } from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components/Footer';

const CartPage = () => {
  const { items, totalCount, totalPrice } = useSelector(selectCart);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.items);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity({ productId, newQuantity }));
  };

  const handleProceedToCheckout = () => {
    const { totalPrice } = useSelector(selectCart);
    if (totalPrice === 0) {
      setCheckoutButtonDisabled(true);
    } else {
    navigate('/cart/shipment', { state: { cartData } });
    }
  };

  return (
    <Box w={'100vw'} minW={'600px'} bgColor={'#F0F3F7'}>
      <Navbar />
      <Box p={8} minH={'65vh'} h={'fit-content'}>
        <Heading mb={4}>Shopping Cart</Heading>
        {items.map((item) => (
          <Box
            key={item.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            width="100%"
            mb={4}
          >
            <HStack spacing={4} align="flex-start">
            {/* Image on the right */}
            <Image src={item.image} alt={item.name} boxSize="100px" objectFit="scale-down" />

            {/* Details in the middle */}
            <Box flex="1">
              <Text fontSize="lg" fontWeight="semibold">
                {item.name}
              </Text>
              <Text>{currencyFormatter.format(item.price, { code: 'IDR' })}</Text>
            </Box>

            {/* Quantity controls on the left */}
            <HStack spacing={2}>
              <IconButton
                icon={<FaMinus />}
                aria-label="Remove"
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
              />
              <Text>{item.quantity}</Text>
              <IconButton
                icon={<FaPlus />}
                aria-label="Add"
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              />
            </HStack>

            {/* Delete button on the far right */}
            <IconButton
              icon={<FaTrash />}
              aria-label="Delete"
              onClick={() => handleRemove(item.id)}
            />
          </HStack>
          </Box>
        ))}
        <Divider my={8} />
        <Flex justifyContent="flex-end" flexDirection="column" alignItems="flex-end">
      <Box>
        <Text fontSize="lg" fontWeight="semibold">
          Total Items: {totalCount}
        </Text>
      </Box>
      <Box mt={2}>
        <Text fontSize="lg" fontWeight="semibold">
          Total Price: {currencyFormatter.format(totalPrice, { code: 'IDR' })}{' '}
        </Text>
      </Box>
      <Button color={'white'} bgColor={'green'} mt={4} onClick={handleProceedToCheckout}>
        Proceed to Checkout
      </Button>
    </Flex>
      </Box>
      <Footer/>
    </Box>
  );
};
export default CartPage;