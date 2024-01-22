// ProductDetail.jsx

import React, { useState } from 'react';
import { Box, Image, Text, Button, VStack, HStack, Input } from '@chakra-ui/react';
import currencyFormatter from 'currency-formatter';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  const formattedPrice = currencyFormatter.format(price, { code: 'IDR' });

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10) || 1;
    setQuantity(newQuantity);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
    console.log(`Product: ${name}, Quantity: ${quantity}, Size: ${selectedSize}`);
  };

  return (
    <HStack spacing="8">
      {/* Left column for product image */}
      <Image src={image} alt={name} objectFit="cover" boxSize="300px" />

      {/* Right column for product details */}
      <VStack align="start" spacing="4">
        <Text fontWeight="semibold" fontSize="xl">
          {name}
        </Text>
        <Text fontSize="lg" fontWeight="bold">
          {formattedPrice}
        </Text>
        <Text fontSize="md" color="gray.500" mb="4">
          {category}
        </Text>
        <Text fontSize="md">{description}</Text>

        {/* Size buttons (for shoes) */}
        <HStack spacing="2" mb="4">
          <Button size="sm" onClick={() => handleSizeSelect('S')}>
            S
          </Button>
          <Button size="sm" onClick={() => handleSizeSelect('M')}>
            M
          </Button>
          <Button size="sm" onClick={() => handleSizeSelect('L')}>
            L
          </Button>
        </HStack>

        {/* Quantity input */}
        <Box>
          <Text fontSize="md" mb="2">
            Quantity:
          </Text>
          <Input
            type="number"
            min={1}
            value={quantity}
            onChange={handleQuantityChange}
            w="60px"
          />
        </Box>

        {/* Checkout button */}
        <Button colorScheme="teal" onClick={handleCheckout} mt="4">
          Checkout
        </Button>
      </VStack>
    </HStack>
  );
};

export default ProductDetail;
