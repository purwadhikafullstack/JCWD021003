import { Box, Button, Flex, Input, Select, Text,Breadcrumb, BreadcrumbItem,BreadcrumbLink,HStack, Icon} from '@chakra-ui/react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import FormCreateAddress from './components/createAddress';
import { ChevronRightIcon } from '@chakra-ui/icons'
import { HomeIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

function CreateAddress() {
  const [address, setAddress] = useState('');

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
            Create Address
          </Text>
          <Flex>
            <Breadcrumb
              spacing="8px"
              separator={<ChevronRightIcon color="gray.500" />}
            >
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Icon as={HomeIcon} boxSize={'16px'} color={'#838383'} />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink
                  color={'brand.lightred'}
                  fontWeight={'700'}
                  fontSize={'12px'}
                >
                  Manage Address
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink
                  color={'brand.lightred'}
                  fontWeight={'700'}
                  fontSize={'12px'}
                >
                  Create Address
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>{' '}
          </Flex>
        </Flex>
        <Box width={'100%'} bg={'white'} padding={'24px'} mb={'40px'}>
          <Text fontSize={'24px'} fontWeight={'700'} mb={"20px"}>
            Address
          </Text>
          
          {/* <Box width={'100%'} height={'474px'} bg={'green.100'}>
            MAP
          </Box>
          <Text>Contact</Text> */}

          <FormCreateAddress />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default CreateAddress;