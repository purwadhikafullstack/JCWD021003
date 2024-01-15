import { Box, Text, Button, Center, Flex } from "@chakra-ui/react";
import {
	InstagramLogo,
	YoutubeLogo,
	TwitterLogo,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Logo } from "../Logo";

export const Footer = () => {
	return (
		<Box
			display={"flex"}
			h={{base: "fit-content",md: "300px"}}
			bgColor={"#EBEBEB"}
			color="black"
			px={{base: "20px",lg: "80px"}}
			flexDirection={{base: "column", md: "row"}}
		>
			<Box w={{base: "100%",md: "30%",lg: "50%"}} pt={"30px"}>
				<Box>
					<Logo posisi="static" size="42px" color="black" />

					<Box w={"200px"} fontSize={{base: "12px",lg:"14px"}}>
						<Text>Pacific Building</Text> 
						Suite 971 Jl. Gatot Soebroto No. 22
                        Trenggalek, SG 44083
					</Box>
					<Flex mt={"20px"} gap={5}>
						<Button
							variant={"ghost"}
							color={"black"}
							_hover={{
								bgColor: "none",
								borderColor: "transparent",
                                color:'green',
							}}
							_focus={{ outline: "none", borderColor: "transparent" }}
							_active={{ bgColor: "transparant" }}
							size={"xm"}
							w={"fit-content"}
						>
							<InstagramLogo size={24} />
						</Button>
						<Button
							variant={"ghost"}
							color={"black"}
							_hover={{
								bgColor: "none",
								borderColor: "transparent",
                                color:'green',
							}}
							_focus={{ outline: "none", border: "transparent" }}
							_active={{ bgColor: "transparant" }}
							size={"xm"}
						>
							<YoutubeLogo size={24} />
						</Button>
						<Button
							variant={"ghost"}
							color={"black"}
							_hover={{
								bgColor: "none",
								borderColor: "transparent",
                                color:'green',
							}}
							_focus={{ outline: "none", border: "transparent" }}
							_active={{ bgColor: "transparant" }}
							size={"xm"}
						>
							<TwitterLogo size={24} />
						</Button>
					</Flex>
				</Box>
			</Box>

			<Box w={{base: "100%",md: "70%",lg: "50%"}}>
				<Center h={"full"}>
					<Flex
						w={"full"}
						h={"full"}
						justifyContent={"space-around"}
						p={{base: "30px 10px", sm: "40px 20px",lg: "40px 50px"}}
						alignItems={"center"}
					>
						<Flex
							h={"100%"}
							justify={"start"}
							direction={"column"}
							fontSize={{base: "12px",lg: "14px"}}
							gap={3}	
						>
							<Text fontWeight={500} fontSize={{base: "14px",lg: "16px"}}>
								About AdaStore
							</Text>
							<Link>
								<Text fontWeight={400}>Login</Text>
							</Link>
							<Link>
								<Text fontWeight={400}>Sign Up</Text>
							</Link>
							
						</Flex>
						
						
					</Flex>
				</Center>
			</Box>
		</Box>
	);
};
