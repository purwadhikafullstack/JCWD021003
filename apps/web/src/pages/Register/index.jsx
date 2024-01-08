import { Box, Flex } from "@chakra-ui/react";
import { Logo } from "../../components/Logo";
import { ImgSection } from "../../components/img-section";
import { RegisterSection } from "./register-section";

export const Register = () => {
	return (
		<Flex
			w={"100vw"}
			minH={"100vh"}
			justify={"center"}
			align={"center"}
			color={"black"}
			direction={"column"}
		>
			<Logo posisi="absolute" size= "42px" color="home.primary"/>
			<Box
				w={{base: "full",md: "80%", lg: "70%", xl: "60%"}}
				display={"flex"}
				flexDirection={{base: "column-reverse", md: "row"}}
				alignItems={"center"}
				boxShadow={{base: "none",md: "0px 0px 13px 10px rgba(255, 46, 99, 0.2)"}}
				borderRadius={"10px"}
				h={{base: "",md: "450px"}}
				justifyContent={"center"}
			>
				<ImgSection />

				<RegisterSection />
			</Box>
		</Flex>
	);
};
