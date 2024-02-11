import { Box, Text, Button, Center, Flex } from '@chakra-ui/react';
import { InstagramLogo, YoutubeLogo, TwitterLogo } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { useSelector } from 'react-redux';

export const Footer = () => {
	const isLogin = useSelector((state) => state.AuthReducer.isLogin);

  return (
    <Box
      display={'flex'}
      h={{ base: 'fit-content', md: '300px' }}
      maxH={{base:'400px'}}
      bgColor={'#EBEBEB'}
      color="black"
      px={{ base: '20px', lg: '80px' }}
      flexDirection={{ base: 'column', md: 'row' }}
      // mb={"25px"}
    >
      <Box w={{ base: '100%', md: '30%', lg: '40%' }} pt={'30px'}>
        <Box>
          <Logo posisi="static" size="42px" color="black" />

          <Box mt={'10px'} w={'200px'} fontSize={{ base: '12px', lg: '14px' }}>
            <Text>Pacific Building</Text>
            Suite 971 Jl. Gatot Soebroto No. 22 Trenggalek, SG 44083
          </Box>
          <Flex mt={'20px'} gap={5}>
            <Button
              variant={'ghost'}
              color={'black'}
              _hover={{
                bgColor: 'none',
                borderColor: 'transparent',
                color: 'green',
              }}
              _focus={{ outline: 'none', borderColor: 'transparent' }}
              _active={{ bgColor: 'transparant' }}
              size={'xm'}
              w={'fit-content'}
            >
              <InstagramLogo size={24} />
            </Button>
            <Button
              variant={'ghost'}
              color={'black'}
              _hover={{
                bgColor: 'none',
                borderColor: 'transparent',
                color: 'green',
              }}
              _focus={{ outline: 'none', border: 'transparent' }}
              _active={{ bgColor: 'transparant' }}
              size={'xm'}
            >
              <YoutubeLogo size={24} />
            </Button>
            <Button
              variant={'ghost'}
              color={'black'}
              _hover={{
                bgColor: 'none',
                borderColor: 'transparent',
                color: 'green',
              }}
              _focus={{ outline: 'none', border: 'transparent' }}
              _active={{ bgColor: 'transparant' }}
              size={'xm'}
            >
              <TwitterLogo size={24} />
            </Button>
          </Flex>
        </Box>
      </Box>

      <Box w={{ base: '100%', md: '70%', lg: '50%' }}>
        <Center h={'full'}>
          <Flex
            w={'full'}
            h={'full'}
            justifyContent={'space-around'}
            p={{ base: '30px 10px', sm: '40px 20px', lg: '40px 50px' }}
            alignItems={'center'}
          >
            <Flex
              h={'100%'}
              justify={'start'}
              direction={'column'}
              fontSize={{ base: '12px', lg: '14px' }}
              gap={3}
            >
              <Text fontWeight={900} fontSize={{ base: '14px', lg: '16px' }}>
                About AdaStore
              </Text>
              {!isLogin && (
                <Box>
                  <Link to={'/login'}>
                    <Text fontWeight={400}>Login</Text>
                  </Link>
                  <Link to={'/register'}>
                    <Text fontWeight={400}>Sign Up</Text>
                  </Link>
                </Box>
              )}
            </Flex>
          </Flex>
        </Center>
      </Box>
    </Box>
  );
};
