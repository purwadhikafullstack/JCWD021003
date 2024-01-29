// CartPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCart, removeFromCart,updateQuantity } from '../../redux/reducer/cartReducer';
import { Box, Heading, Text, HStack, Divider, Image,IconButton } from '@chakra-ui/react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import currencyFormatter from 'currency-formatter';
import { Navbar } from '../../components/Navbar';

const CartPage = () => {
  const { items, totalCount, totalPrice } = useSelector(selectCart);
  console.log('ini',items)
  console.log('totalCount',totalCount)
  const dispatch = useDispatch();
  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity({ productId, newQuantity }));
  };

  return (
    <Box>
      <Navbar />
      <Box p={8}>
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
              {/* Add more details as needed */}
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

        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb={2}>
            Total Items: {totalCount}
          </Text>
          <Text fontSize="lg" fontWeight="semibold">
            Total Price: {currencyFormatter.format(totalPrice, { code: 'IDR' })}{' '}
            {/* Replace with the actual calculation */}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default CartPage;
