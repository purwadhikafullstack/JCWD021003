import { Box, Text, Button,Image } from '@chakra-ui/react';
// import React from "react";
// import { useState } from "react";
import { Link } from 'react-router-dom';
import { PopoverProfile } from './components/popoverProfile';
import DrawerList from './components/drawerList';
import { SearchProduct } from './components/SearchProduct';
import logo from '../../assets/logo3.png'
import {useSelector} from 'react-redux'

export const Navbar = () => {
//   const token = localStorage.getItem('token');
  const user = useSelector((state) => state.AuthReducer.isLogin);
	return (
		<Box
			// w={"100vw"}
			h={"74px"}
			py={"25px"}
			bgColor={"black"}
			display={"flex"}
			alignItems={"center"}
			top={-1}
			color={"white"}
			// position={"fixed"}
			zIndex={10}
		>
			<Box
				w={"55%"}
				display={"flex"}
				// justifyContent={"space-between"}
				px={{ base: "10px", xl: "80px" }}
				alignItems={"center"}
			>
				<Link to="/">
					<Box
						fontSize={{ base: "20px", md: "34px" }}
						_hover={{ color: "white" }}
					>
						{/* <Text fontWeight={400}>
							ada<span style={{ fontWeight: "200" }}>Store.</span>
						</Text> */}
						<Image src={logo} w={{base:'50%',sm:'50%', md:'50%',lg:'50%'}}/>
					</Box>
				</Link>
				<Box  display={{ base: "none", md: "block" }} w={'80%'}>
						<SearchProduct />
				</Box>
			</Box>

      <Box
        w={'45%'}
        display={{ base: 'none', md: 'flex' }}
        justifyContent={'end'}
        alignItems={'center'}
        px={'30px'}
      >
        <Box
          display={'flex'}
          mr={'14px'}
          gap={{ base: 3, xl: '50' }}
          alignItems={'center'}
        >
          {user ? (
            <PopoverProfile />
          ) : (
            <Box display={'flex'} gap={'5'} alignItems={'center'}>
              <Link to="/login">
                <Text fontSize={{ base: '12px', lg: '16px' }}>Log in</Text>
              </Link>
              <Link to="/register">
                <Button
                  bgColor={'green'}
                  _hover={{ color: 'green', bgColor: '#EDF2F7' }}
                  color={'white'}
                  h={{ base: '30px', lg: '40px' }}
                  w={{ base: '60px', lg: '108px' }}
                  fontSize={{ base: '12px', lg: '16px' }}
                >
                  Sign Up
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Box>

      <Box
        w={'45%'}
        display={{ base: 'flex', md: 'none' }}
        justifyContent={'end'}
        alignItems={'center'}
        px={'20px'}
      >
        <DrawerList />
      </Box>
    </Box>
  );
};
