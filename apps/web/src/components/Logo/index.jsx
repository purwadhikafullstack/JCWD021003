/* eslint-disable react/prop-types */
import { Box, Text, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import logo from '../../assets/logo.png'

export const Logo = (props) => {
  return (
    <Box position={`${props.posisi}`} top={"5"}>
				<Link to="/">
					{/* <Text
						fontWeight={400}
						fontSize={`${props.size}`}
						color={`${props.color}`}
						// fontSize={"42px"}
						// color={"black"}
					>
						ada<span style={{ fontWeight: "200" }}>Store.</span>
					</Text> */}
					<Image src={logo}/>
				</Link>
			</Box>
  )
}