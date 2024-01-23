import { useEffect, useState }  from 'react'
import axios from "axios";
import {SimpleGrid, Box,
	Card,
	Flex,
	Grid,
	Image,
	Text,
	Center, Avatar} from '@chakra-ui/react'
// import { ProductCard } from '../card'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import currencyFormatter from 'currency-formatter';

export const CardContainer = () => {
    const [product, setProduct] = useState();
	const navigate = useNavigate()

	const dataProduct = async () => {
		try {
			const response = await axios.get("http://localhost:8000/api/product");
			setProduct(response.data?.data);
            console.log("data",response.data?.data);
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		dataProduct();
	}, []);
    const formattedPrice = product
    ? currencyFormatter.format(product?.price, { code: 'IDR' })
    : '';
    
  return (
//     <SimpleGrid columns={3} spacing={4}>
//     {product?.map((data) => (
//       <ProductCard
//         key={data.id}
//         image={data.image}
//         name={data.name}
//         category={data.category}
//         price={data.price}
//         onAddToCart={() => handleAddToCart(data.id)}
//       />
//     ))}
//   </SimpleGrid>
<Flex
			justify={"center"}
			align={"center"}
			direction={"column"}
			mb={"100px"}
		>
			<Flex
				justify={"start"}
				w={{ base: "75%", sm: "87%", md: "80%", lg: "75%" }}
			>
				<Text
					fontSize={{ base: "20px", md: "32px" }}
					fontWeight={600}
					m={"54px 0px 46px 0px"}
				>
					Featured Product
				</Text>
			</Flex>
			{/* card */}
			<Grid
				templateColumns={{
					sm: "repeat(2, 1fr)",
					md: "repeat(3, 1fr)",
					xl: "repeat(4, 1fr)",
				}}
				gap={6}
				w={{ base: "75%", sm: "87%", md: "80%", lg: "75%" }}
			>
				{product?.length > 0 ? (
					product.slice(0, 8).map((data, index) => {
						return (
							<Card
								key={index}
								bgColor={"whiteAlpha.600"}
								p={"0px 0px 10px 0px"}
								gap={2}
								fontSize={"14px"}
								h={"350px"}
								overflow={"hidden"}
								cursor={"pointer"}
								outline={"1px solid rgba(0, 0, 0, 0.1)"}
								_hover={{
									boxShadow: "0px 0px 13px 10px rgba(0, 0, 0, 0.1)",
									transform: "scale(1.01)",
								}}
								onClick={() => navigate(`product/${data.id}`)}
							>
								<Box
									backgroundPosition={"center"}
									backgroundSize={"cover"}
									backgroundRepeat={"no-repeat"}
									h={"214px"}
								>
									<Image
										src={``}
									/>
								</Box>
								<Flex
									direction={"column"}
									h={"full"}
									p={"0px 15px 10px 15px"}
									justify={"space-between"}
								>
									<Box
										display={"flex"}
										flexDirection={"column"}
										gap={3}
									>
										<Box h={"40px"} overflow={"hidden"}>
											{data.name}
										</Box>
										<Box color={"gray"} fontSize={"13px"}>
											{data.start_date} - {data.end_date}
										</Box>
										<Box fontWeight={700} color={"home.primary"}>
											{data.price}
											{/* Rp. 500.000 */}
										</Box>
									</Box>

									<hr />
                                    {/* brand */}
									<Box display={"flex"} alignItems={"center"} gap={3}>
										{data?.user?.avatar ? (
											<Image
												src={`http://localhost:8080/uploads/avatar/${data.user?.avatar}`}
												w={"40px"}
												h={"40px"}
												borderRadius={"50%"}
											/>
										) : (
											<Avatar
												src="https://bit.ly/broken-link"
												size={"sm"}
											/>
										)}
										{/* <Box>{data.user.brand}</Box> */}
									</Box>
								</Flex>
							</Card>
						);
					})
				) : (
					<></>
				)}
			</Grid>
			<Center mt={"30px"}>
				<Link to="/discovery">
					<Text
						fontSize={{ base: "14px", md: "20px" }}
						fontWeight={600}
						color={"home.primary"}
						textDecoration={"underline"}
					>
						See All Product
					</Text>
				</Link>
			</Center>
		</Flex>
  )
}
