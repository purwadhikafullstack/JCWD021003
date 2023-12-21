import { Flex, Image, Text } from "@chakra-ui/react";
import ImgVector from "../../assets/3902762.jpg";

export const ImgSection = () => {
	return (
		<Flex
			w={"50%"}
			h={"100%"}
			// borderLeft={"1px solid black"}
			display={{base: "none",md: "flex"}}
			align={"center"}
			justify={"center"}
			flexDirection={"column"}
		>
			<Flex
				borderRadius={"10px"}
				w={"80%"}
				h={"50%"}
				direction={"column"}
				justify={"center"}
				align={"center"}
			>
				<Image src={ImgVector} h={"full"} />
			</Flex>
			<Flex direction={"column"} textAlign={"center"} w={"80%"}>
				<Text fontWeight={600}>
					a
				</Text>
				<Text fontWeight={400}>
					a
				</Text>
			</Flex>
		</Flex>
	);
};
