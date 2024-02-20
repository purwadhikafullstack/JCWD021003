import { Button, Flex, Box, Text } from '@chakra-ui/react';

const Pagination = ({ currentPage, totalPages, onPageChange, pageSize, totalRecords }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const calculateItemsOnCurrentPage = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return Math.min(pageSize, totalRecords - startIndex);
  };
  // console.log(currentPage,pageSize,totalRecords)

  const itemsOnCurrentPage = calculateItemsOnCurrentPage(currentPage, pageSize, totalRecords);

  return (
    <Flex justifyContent={'space-between'} align={'center'}>
        {/* <Flex>
            <Text fontSize={'14px'} color={'brand.grey350'}>Showing {itemsOnCurrentPage} of {totalRecords} data</Text>
        </Flex> */}
        <Flex justify="center" align="center" mt="4">
        
        {pageNumbers.map(number => (
            <Box key={number} mx="1">
            <Button
                onClick={() => onPageChange(number)}
                bg={currentPage === number ? 'white' : 'white'}
                color={currentPage === number ? 'green' : 'brand.grey350'}
                border={currentPage === number ? '1px solid green' : 'none'}
                _hover={{bg: 'green', color:'white'}}
                variant="solid"
            >
                {number}
            </Button>
            </Box>
        ))}
        
        </Flex>
    </Flex>
  );
};

export default Pagination;