import React from 'react';
import { Box, Image, Text, Button } from '@chakra-ui/react';
import currencyFormatter from 'currency-formatter';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProductCard = ({ id, image, name, category, price, onAddToCart }) => {
  const isLogin = useSelector((state) => state.AuthReducer.isLogin);

  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };
  const formattedPrice = currencyFormatter.format(price, { code: 'IDR' });
  return (
    <Box
      maxW={{base:"sm"}}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      m="4"
      
    >
      <Image src={image} alt={name} objectFit="scale-down" h="200px" mx={'auto'} cursor="pointer"
      onClick={handleCardClick}/>

      <Box p="6" cursor="pointer" h={"150px"}
      onClick={handleCardClick}>
        <Text fontWeight="semibold" fontSize="lg" mb="2">
          {name}
        </Text>
        <Text fontSize="sm" color="gray.500" mb="2">
          {category}
        </Text>
        <Text fontSize="lg" fontWeight="bold" mb="4">
          {formattedPrice}
        </Text>
       
      </Box>
      <Box p={6}>
      <Button
        onClick={isLogin ? onAddToCart : null}
        isDisabled={!isLogin}
        bgGradient={'linear(to-r, #45b649, #a8e063)'}
        fontWeight={700}
        color={'white'}
        size="sm"
      >
        {isLogin ? 'Add to Bag' : 'Log in to Add to Bag'}
      </Button>
      </Box>
    </Box>
  );
};
