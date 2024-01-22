import {
	Box,
	Text,
	Flex,
	Image,
	AspectRatio,
	Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";

export const DrawlistLogin = () => {
	const user = useSelector((state) => state.AuthReducer.user);

	const logOut = () => {
		localStorage.removeItem("token");
	};

	return (
		<Flex
			h={"full"}
			direction={"column"}
			justifyContent={"space-between"}
			w={"full"}
		>
			<Box>
				<Box
					w={"full"}
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
					bgColor={"whitesmoke"}
					p={"20px"}
					border={"1px solid balck"}
					borderRadius={"10px"}
				>
					<Flex w={"full"} gap={3} justify={"center"} align={"center"}>
						<AspectRatio
							display={"flex"}
							alignItems={"center"}
							justifyContent={"center"}
							borderRadius={"50%"}
							overflow={"hidden"}
							width="20"
							ratio={1}
						>
							<Image
								src={`${import.meta.env.VITE_API_IMAGE_URL}/avatar/${user?.avatar}`}
							/>
						</AspectRatio>
						<Center flexDirection={"column"} >
							<Text fontSize={'25px'} fontWeight={800}>{user.username}</Text>
							{/* <Text textAlign={"end"} w={"full"} fontSize={"12px"}>{user.coin} coin</Text> */}
						</Center>
					</Flex>
				</Box>
				<Box display={"flex"} flexDirection={"column"} gap={5} mt={"20px"}>
					<Link to="/profile">
						<Text fontWeight={800}>Dashboard</Text>
					</Link>
					<Link to="/wishlist">
						<Text fontWeight={800}>Wishlist</Text>
					</Link>
					<Link to="/discovery">
						<Text fontWeight={800}>Discovery</Text>
					</Link>
				</Box>
			</Box>

			<Link to={"/login"} onClick={logOut}>
				<Flex alignItems={"center"} gap={2} color={"red"}>
					<RiLogoutBoxLine />
					<Text>Log Out</Text>
				</Flex>
			</Link>
		</Flex>
	);
};
