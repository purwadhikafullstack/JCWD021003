import { Box, SimpleGrid, Button, Flex, Icon } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { ProductCard } from '../card';
import { Products } from '../../../../../dummy/product';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../redux/reducer/cartReducer';
import { chunkArray } from './utils/chunkArray';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';


export const CardContainer = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [chunkedProducts, setChunkedProducts] = useState([]);

  useEffect(() => {
    const totalProducts = Products.length;
    setTotalPages(Math.ceil(totalProducts / itemsPerPage));

    const chunkedArray = chunkArray(Products, itemsPerPage);
    setChunkedProducts(chunkedArray);
  }, [itemsPerPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const hasNextPage = () => {
    return currentPage < totalPages;
  };

  const handleAddToBag = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <Box>
      <SimpleGrid columns={{ md: 3, sm: 2, base: 1 }} spacing={4} mx={'15px'}>
        {chunkedProducts[currentPage - 1]?.map((data) => (
          <ProductCard
            key={data.id}
            id={data.id}
            image={data.image}
            name={data.name}
            category={data.category}
            price={data.price}
            onAddToCart={() => handleAddToBag(data)}
          />
        ))}
      </SimpleGrid>
      {/* Pagination controls */}
      <Flex justifyContent="center" mt="4" mb={'20px'}>
        {currentPage > 1 && (
          <Button onClick={() => handlePageChange(currentPage - 1)} value={'outline'} bgColor={'transparent'}>
            <Icon as={ArrowLeftIcon} />
          </Button>
        )}
        <Flex
          justifyContent="center"
          alignItems="center"
          mx="2"
          style={{ minWidth: '60px' }}
        >
          <span> {currentPage}</span>
        </Flex>
        {currentPage < totalPages && (
          <Button onClick={() => handlePageChange(currentPage + 1)} value={'outline'} bgColor={'transparent'}>
            <Icon as={ArrowRightIcon} />
          </Button>
        )}
      </Flex>
    </Box>
  );
};
