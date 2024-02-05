import { Box, Button, Flex, Input, Select, Text,Breadcrumb, BreadcrumbItem,BreadcrumbLink,HStack, Icon} from '@chakra-ui/react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ChevronRightIcon } from '@chakra-ui/icons'
import { HomeIcon,PlusIcon } from '@heroicons/react/24/outline';
import AddressList from './components/addressList';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ManageAddress() {
    const navigate = useNavigate();
  return (
    <Box bg={'green.400'} height={'100%'}>
            <Navbar />
      <Box padding={'0px 100px'} marginBottom={'150px'}>
        <Flex
          className="create-address-top"
          flexDir={'column'}
          gap={'16px'}
          marginTop={'24px'}
          marginBottom={'40px'}
        >
          <Text fontSize={'24px'} fontWeight={'700'}>
            Manage Address
          </Text>
          <Flex>
            <Box bgColor={'white'} p={'5px 10px'} borderRadius={'15px'} w={'300px'}>
            <Breadcrumb
              spacing="8px"
              separator={<ChevronRightIcon color="gray.500" />}
            >
              <BreadcrumbItem>
                <BreadcrumbLink href='/'>
                  <Icon as={HomeIcon} boxSize={'16px'} color={'#838383'} />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink
                  color={'black'}
                  fontWeight={'700'}
                  fontSize={'12px'}
                  href='/profile'
                >
                  Profile
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink
                  color={'black'}
                  fontWeight={'700'}
                  fontSize={'12px'}
                >
                  Manage Address
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>{' '}
            </Box>
          </Flex>
        </Flex>
        <Box width={'100%'} bg={'white'} padding={'24px'} mb={'40px'} borderRadius={"20px"}>
          <Flex justifyContent={'space-between'}
                    alignItems={'center'}>
                        <Button bg={'green'}
                        color={'white'}
                        _hover={{bg: '#f50f5a'}} 
                        _active={{opacity:'70%'}}
                        onClick={() => navigate("/create-address")}>
                            <Flex justifyContent={'center'}
                            alignItems={'center'}
                            padding={'12px 16px'}
                            gap={'10px'}>
                                <Icon as={PlusIcon} boxSize={'24px'}/>
                                <Text fontSize={'14px'} fontWeight={'700'}>
                                    Create Address
                                </Text>
                            </Flex>
                        </Button>
                    </Flex>
        </Box>
        <Box width={'100%'}
                bg={'white'} 
                padding={'24px'}
                mb={'40px'}
                borderRadius={"20px"}>
                <Text fontSize={'24px'}
                    fontWeight={'700'}>
                        Address
                    </Text>
                   <AddressList/>
                </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default ManageAddress;
