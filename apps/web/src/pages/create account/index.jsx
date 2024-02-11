import { Box, Button, Flex, Input, Select, Text,Breadcrumb, BreadcrumbItem,BreadcrumbLink,HStack, Icon} from '@chakra-ui/react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ChevronRightIcon } from '@chakra-ui/icons'
import { HomeIcon,PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormCreateAccount from './components/form Create Account';

function CreateAccount() {
    const navigate = useNavigate();
    const navigateTo = () => {
      navigate('/admin-dashboard/account-management');
    };

  return (
    <Box bg={'green.400'} height={'100%'} w={'100vw'} minW={'800px'}>
      <Navbar />
      <Box padding={{lg:'0px 100px',base:'0px 30px'}} marginBottom={'150px'}>
        <Flex
          className="create-address-top"
          flexDir={'column'}
          gap={'16px'}
          marginTop={'24px'}
          marginBottom={'40px'}
        >
          <Text fontSize={'24px'} fontWeight={'700'}>
            Create Account
          </Text>
          <Flex>
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
                  onClick={navigateTo}
                >
                  Account Management
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink
                  color={'black'}
                  fontWeight={'700'}
                  fontSize={'12px'}
                >
                  Create Account
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>{' '}
          </Flex>
        </Flex>
        <Box width={'100%'}
                bg={'white'} 
                padding={'24px'}
                mb={'40px'}
                borderRadius={"20px"}>
                    <Text fontSize={'24px'}
                    fontWeight={'700'}
                    mb={'20px'}>
                        Account
                    </Text>
                    <FormCreateAccount/>
                </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default CreateAccount;
