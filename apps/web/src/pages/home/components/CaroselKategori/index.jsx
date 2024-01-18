// import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';

// import required modules
import { Navigation } from "swiper/modules";
import { Box, Button, Center, Text } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";

export const CarouselKategori = () => {
	const navigate = useNavigate();
	const [category, setCategory] = useState();

	const dataCategory = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8000/api/product/category"
			);
			console.log('category', response.data.data)
			setCategory(response.data.data);
		} catch (err) {
			console.log(err.message);
		}
	};

	// const Image = [];

	useEffect(() => {
		dataCategory();
	}, []);

	return (
		<Box display={"flex"} justifyContent={"center"} w={"full"}mb={'20px'} >
			<Box
				display={"flex"}
				flexDirection={"column"}
				w={{ base: "75%", sm: "87%", md: "80%", lg: "75%" }}
			>
				<Text
					fontSize={{ base: "16px", lg: "32px" }}
					fontWeight={600}
					m={{ base: "14px 0px 16px 0px", lg: "54px 0px 46px 0px" }}
				>
					Featured Categories
				</Text>
				<Box
					mb={"20px"}
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
					h={{ base: "100px", sm: "120px", md: "150px" }}
				>
					<Button
						className="prev"
						position={"absolute"}
						zIndex={5}
						left={{
							base: "60px",
							sm: "60px",
							md: "100px",
							lg: "170px",
							xl: "210px",
						}}
						size={"xm"}
						borderRadius={"50%"}
						fontSize={{ sm: "16px", lg: "24px", xl: "28px" }}
						bgColor={"white"}
						_focus={{ outline: "none" }}
						_hover={{ border: "none" }}
					>
						<ChevronLeftIcon />
					</Button>
					<Button
						className="next"
						position={"absolute"}
						zIndex={5}
						right={{
							base: "52px",
							sm: "35px",
							md: "75px",
							lg: "145px",
							xl: "185px",
						}}
						size={"xm"}
						borderRadius={"50%"}
						fontSize={{ sm: "16px", lg: "24px", xl: "28px" }}
						bgColor={"white"}
						_focus={{ outline: "none" }}
						_hover={{ border: "none" }}
					>
						<ChevronRightIcon />
					</Button>
					<Swiper
						style={{
							width: "100%",
							height: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
						slidesPerView={3}
						breakpoints={{
							640: {
								slidesPerView: 5,
								spaceBetween: 0,
							},
							768: {
								slidesPerView: 5,
								spaceBetween: 0,
							},
							1150: {
								slidesPerView: 5,
								spaceBetween: 0,
							},
						}}
						spaceBetween={10}
						className="mySwiper"
						navigation={{
							nextEl: ".next",
							prevEl: ".prev",
							clickable: true,
						}}
						modules={[Navigation]}
					>
						{category?.map((data) => {
							console.log("data", data)
							// console.log("index", index)
							return (
								<SwiperSlide
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
									key={data.id}
								>
									<Box
										display={"flex"}
										justifyContent={"center"}
										alignItems={"center"}
										color={"white"}
										fontWeight={600}
										h={"90px"}
										w={"90px"}
										borderRadius={"30px"}
										backgroundImage={`${import.meta.env.VITE_API_IMAGE_URL}/categories/${data?.image}`}
										backgroundSize={"100%"}
										backgroundPosition={"center"}
										backgroundRepeat={"no-repeat"}
										cursor={"pointer"}
										onClick={() => {
											navigate("/discovery");
											sessionStorage.setItem('');
										}}
									>
										{data.name}
									</Box>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</Box>
				<Center>
					<Link to="/discovery">
						<Text
							fontSize={{ base: "14px", lg: "20px" }}
							fontWeight={600}
							color={"black"}
							textDecoration={"underline"}
						>
							See All Categories
						</Text>
					</Link>
				</Center>
			</Box>
		</Box>
	);
};
