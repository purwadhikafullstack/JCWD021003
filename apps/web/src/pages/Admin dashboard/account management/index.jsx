import { Box, Flex, Text,Breadcrumb, BreadcrumbItem, BreadcrumbLink, HStack, Icon } from '@chakra-ui/react';
import { Navbar } from '../../../components/Navbar';
import AdminList from './components/admin list';
import UserList from './components/user list';
import { getAdminList, getUserList } from './services/getAccount';
import { useEffect, useState } from 'react';
import { HomeIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Footer } from '../../../components/Footer';

function AccountManagement() {
  const [admin, setAdmin] = useState([]);
  const [user, setUser] = useState([]);


  const fetchAdmin = async () => {
    try {
      const fetchAdminData = await getAdminList();
      setAdmin(fetchAdminData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchUser = async () => {
    try {
      const fetchUserData = await getUserList();
      setUser(fetchUserData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Box bg={'#F0F3F7'} height={'100%'}>
      <Navbar />
      <Box padding={'0px 20px'} marginBottom={'150px'} h={'auto'}>
        <Box className="top-dashboard" mt={'36px'} mb={'24px'}>
          <Flex justifyContent={'space-between'}>
            <Flex>
              <Text fontSize={'24px'} fontWeight={'700'}>
              Account Management
              </Text>
            </Flex>
            <Flex justifyContent={'flex-end'} gap={'12px'}>
            </Flex>
          </Flex>
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
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink
                  color={'black'}
                  fontWeight={'700'}
                  fontSize={'12px'}
                >
                    Account Management
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>
        </Box>
        <Box className="table" h={'fit-content'} mb={'20px'}>
        <Text p={'10px'} fontWeight={700}> Admin Account List</Text>
          <AdminList admin={admin} onAdminUpdated={fetchAdmin} />
        </Box>
        <Box className="table" h={'fit-content'}>
            <Text p={'10px'} fontWeight={700}> User Account List</Text>
          <UserList user={user} onUserUpdated={fetchUser} />
        </Box>
      </Box>
      <Footer/>
    </Box>
  );
}

export default AccountManagement;