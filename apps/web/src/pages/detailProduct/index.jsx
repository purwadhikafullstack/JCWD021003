import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Input,
} from '@chakra-ui/react';
import currencyFormatter from 'currency-formatter';
import { Navbar } from '../../components/Navbar';
import { Products } from '../../../dummy/product';
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
      console.log('cek', productIdInt);
      // Find the product in the local product list
      const selectedProduct = Products.find((p) => p.id === productIdInt);
      console.log('selectedProduct', selectedProduct);
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
      <HStack spacing="8" h={'100vh'}>
        {/* Left column for product image */}
        <Image
          src={product?.image}
          alt={product?.name}
          objectFit="scale-down"
          boxSize="300px"
        />

        {/* Right column for product details */}
        <VStack align="start" spacing="4">
          <Text fontWeight="semibold" fontSize="xl">
            {product?.name}
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            {formattedPrice}
          </Text>
          {/* <Text fontSize="md" color="gray.500" mb="4">
        {product.category}
      </Text> */}
          <Text fontSize="md">{product?.description}</Text>

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
    </Box>
  );
};
