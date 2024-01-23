import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {  Box,  Image,  Text,  Button,  VStack,  HStack,  Input,} from '@chakra-ui/react';
import currencyFormatter from 'currency-formatter';
import { Navbar } from '../../components/Navbar';
import { Products } from '../../../dummy/product';
import { Footer } from '../../components/Footer';
// import ProductDetail from './components/productDetail';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  //   const fetchProductDetail = async (id) => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8000/api/product/details/${id}`,
  //       );
  //       setProduct(response.data?.data);
  //       console.log('detail', response.data.data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   useEffect(() => {
  //     fetchProductDetail(id);
  //   }, [id]);
  useEffect(() => {
    const fetchProductDetail = () => {
      const productIdInt = parseInt(id, 10);
      // Find the product in the local product list
      const selectedProduct = Products.find((p) => p.id === productIdInt);
      if (selectedProduct) {
        setProduct(selectedProduct);
        setLoading(false);
      } else {
        setError('Product not found');
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id, Products]);

  const formattedPrice = product
    ? currencyFormatter.format(product?.price, { code: 'IDR' })
    : '';

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10) || 1;
    setQuantity(newQuantity);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityDecrement = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
    console.log(
      `Product: ${product.name}, Quantity: ${quantity}, Size: ${selectedSize}`,
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Box>
      <Navbar />
      <Box m={{base:'20px',sm:'30px',md:"40px"}} display="grid" gridTemplateColumns={{ base: '1fr', sm:"1fr", md: 'repeat(2, 1fr)' }} gap="8">
      {/* Left column for product image */}
      <Image src={product.image} alt={product.name} objectFit="scale-down" boxSize="100%" />

      {/* Right column for product details */}
      <Box>
        <Text fontWeight="semibold" fontSize="xl">
          {product.name}
        </Text>
        <Text fontSize="lg" fontWeight="bold">
          {formattedPrice}
        </Text>
        <Text fontSize="md" color="gray.500" mb="4">
          {product.category}
        </Text>

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

        {/* Quantity input with buttons */}
        <Box>
          <Text fontSize="md" mb="2">
            Quantity:
          </Text>
          <HStack>
            <Button size="sm" onClick={handleQuantityDecrement}>
              -
            </Button>
            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              w="60px"
              textAlign="center"
            />
            <Button size="sm" onClick={handleQuantityIncrement}>
              +
            </Button>
          </HStack>
        </Box>

        {/* Checkout button */}
        <Button colorScheme="teal" onClick={handleCheckout} mt="4" w="100%">
          Checkout
        </Button>
        <Box mt={"20px"} p={"20px"} bgColor={"#F8F8FF"} borderRadius={"20px"}>
        <Text fontSize="md">{product.description}</Text>
        </Box>
      </Box>
    </Box>
      <Footer/>
    </Box>
  );
};
