import {
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Button,
} from "@chakra-ui/react";
import React from "react";
// import { Link } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { BsList } from "react-icons/bs";
import { Logo } from "../../Logo";
import {DrawlistNotLogin} from "../components/drawlistNotLogin"
import { DrawlistLogin } from "../components/drawlistLogin";

export default function DrawerList() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();
	const token = localStorage.getItem("token");

	return (
		<>
			<Button
				ref={btnRef}
				size={"xm"}
				variant={"ghost"}
				onClick={onOpen}
				border={"none"}
				_hover={{ bgColor: "tranparent", border: "none" }}
				_active={{ bgColor: "tranparent", border: "none" }}
				_focus={{
					bgColor: "tranparent",
					borderColor: "transparent",
					outline: "none",
				}}
			>
				<BsList fontSize={"32px"} color="white" />
			</Button>
			<Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton
						_hover={{ bgColor: "tranparent", border: "none" }}
						_active={{ bgColor: "tranparent", border: "none" }}
						_focus={{
							bgColor: "tranparent",
							borderColor: "transparent",
							outline: "none",
						}}
					/>
					<DrawerHeader
						display={"flex"}
						h={"70px"}
						alignItems={"center"}
					>
						<Logo posisi="static" size="30px" color="home.primary" />
					</DrawerHeader>

					<DrawerBody display={"flex"} justifyContent={"start"}>
						{token ? (
							<DrawlistLogin />
						) : (
							<DrawlistNotLogin/>
						)}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}
