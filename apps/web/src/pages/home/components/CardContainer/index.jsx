import { Box, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { ProductCard } from '../card'
import { Products } from '../../../../../dummy/product'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../redux/reducer/cartReducer';

export const CardContainer = () => {
	const dispatch = useDispatch()

	const handleAddToBag = (product) => {
		dispatch(addToCart(product));
	  };
  return (
	<Box>
		    <SimpleGrid columns={{md:3, sm:2,base:1}} spacing={4} mx={"15px"}>
        {Products?.map((data) => (
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
	</Box>
  )
}