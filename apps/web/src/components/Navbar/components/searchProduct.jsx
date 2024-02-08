import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	useDisclosure,
	Input,
	Box,
	InputGroup,
	InputLeftElement,
	Flex,
	Text,
	Tooltip,
	Image,
	InputRightElement,
	ModalCloseButton,
	List, ListItem,Link
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Products } from "../../../../dummy/product";
import { Link as RouterLink } from "react-router-dom";

export const SearchProduct = () => {
	const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchInput = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term.trim() === '') {
      closeModal();
      setFilteredProducts([]);
    } else {
      searchProducts(term);
    }
  };

  const searchProducts = (term) => {
    const searchTermLower = term.toLowerCase();
    const filtered = Products.filter(
      (product) => product.name.toLowerCase().includes(searchTermLower)
    );
    setFilteredProducts(filtered);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
	return (
		<Box w={'100%'}>
      <Input
        type="text"
        placeholder="Search Product..."
        value={searchTerm}
        onChange={handleSearchInput}
        onClick={openModal} 
      />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search Results</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
		  <Input
              type="text"
              placeholder="Search Product..."
			  mb={'20px'}
              value={searchTerm}
              onChange={handleSearchInput}
			  border={'1px solid green'}
            />
		  {searchTerm.trim() !== '' && (
              <List>
			  {filteredProducts.map((product) => (
				<ListItem key={product.id}>
				  <Link as={RouterLink} to={`/product/${product.id}`} textDecoration="none">
					<Box display="flex" alignItems="center">
					  <Image src={product.image} alt={product.name} objectFit={'scale-down'} w="50px" h="50px" mr="4" />
					  <h3>{product.name}</h3>
					</Box>
				  </Link>
				</ListItem>
			  ))}
			</List>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
	  </Box>
	);
};
