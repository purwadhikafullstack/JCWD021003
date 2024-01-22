import { useEffect, useState }  from 'react'
import axios from "axios";
import {SimpleGrid,} from '@chakra-ui/react'
import { ProductCard } from '../card'


export const CardContainer = (product) => {
    // const [product, setProduct] = useState();
	// // const navigate = useNavigate()

	// const dataProduct = async () => {
	// 	try {
	// 		const response = await axios.get("http://localhost:8000/api/product");
	// 		setProduct(response.data?.data);
    //         console.log("data",response);
	// 	} catch (err) {
	// 		console.log(err.message);
	// 	}
	// };

	// useEffect(() => {
	// 	dataProduct();
	// }, []);
  return (
    <SimpleGrid columns={3} spacing={4}>
    {product?.map((data) => (
      <ProductCard
        key={data.id}
        image={data.image}
        name={data.name}
        category={data.category}
        price={data.price}
        onAddToCart={() => handleAddToCart(data.id)}
      />
    ))}
  </SimpleGrid>
  )
}
