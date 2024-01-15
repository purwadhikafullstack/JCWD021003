import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	Button,
	PopoverFooter,
	Text,
	Flex,
	Image,
	AspectRatio,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Avatar } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RiLogoutBoxLine } from "react-icons/ri";

export const PopoverProfile = () => {
	const user = useSelector((state) => state.AuthReducer.user);

	const logOut = () => {
		localStorage.removeItem("token");
	};

	return (
		<Popover placement="bottom-start">
			<Button
				alignItems={"center"}
				variant={"ghost"}
				size={"xm"}
				border={"none"}
				_hover={{
					bgColor: "transparant",
					border: "none",
					fillOpacity: "50%",
				}}
				_active={{ bgColor: "transparant" }}
				bgColor={"red"}
				display={"flex"}
				justifyContent={"center"}
				borderRadius={"50%"}
				p={"2.5px"}
				outline={"1px solid white"}
				overflow={"hidden"}
			>
				<PopoverTrigger>
					{user?.avatar ? (
						<AspectRatio width="10" ratio={1}>
							<Image
								src={`${import.meta.env.VITE_API_IMAGE_URL}/avatar/${user?.avatar}`}
								transform={"scale(1.5)"}
							/>
						</AspectRatio>
					) : (
						<Avatar src="https://bit.ly/broken-link" size={"sm"} />
					)}
				</PopoverTrigger>
			</Button>
			<PopoverContent color="black" w={"fit-content"} right={-6}>
				<PopoverBody>
					<Link to={"/profile"}>Dashboard</Link>
				</PopoverBody>
				<PopoverFooter>
					<Link to={"/login"} onClick={logOut}>
						<Flex align={"center"} gap={2}>
							<Text color={"red"}>Log Out</Text>
							<RiLogoutBoxLine />
						</Flex>
					</Link>
				</PopoverFooter>
			</PopoverContent>
		</Popover>
	);
};
