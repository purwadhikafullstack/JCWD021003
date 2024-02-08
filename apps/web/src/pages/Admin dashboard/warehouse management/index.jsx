import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
// import Pagination from './components/pagination'
import { BreadCrumbs } from './components/breadCrumbs'
import { getWarehouseList } from './services/getWarehouse'
import TableWarehouse from './components/warehouse-list'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../../../components/Navbar'

function WarehouseList() {
  const location = useLocation()
  const [warehouse, setWarehouse] = useState([])
  const [name, setName] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalRecords, setTotalRecords] = useState(0)

  const fetchWarehouseList = async () => {
    try {
      const fetchWarehouseData = await getWarehouseList()
      console.log(fetchWarehouseData)
      setWarehouse(fetchWarehouseData)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchWarehouseList()
  }, [])

  useEffect(() => {
    if (location.state?.warehouseCreated) {
      fetchWarehouseList()
    }
  }, [location.state])

  const navigate = useNavigate()

  return (
    <Box bg={'#F1F1F1'} height={'100vh'} w={'100vw'}>
     <Navbar/>
      <Box padding={{base: '0px 10px', md:'0px 30px'}} marginBottom={'150px'}>
        <Box className="top-dashboard" mt={'36px'} mb={'24px'}>
          <Box display={{ base: 'block', md: 'none' }}>
            <Flex justifyContent={'space-between'} align={'center'} mb={'10px'}>
              <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={'700'}>
                Warehouse List
              </Text>
              <Button
                bg={'green'}
                color={'white'}
                _hover={{ bg: '#f50f5a' }}
                _active={{ opacity: '70%' }}
                w={{ base: '150px', md: '220px' }}
                h={{ base: '34px', md: '48px' }}
                display={'flex'}
                onClick={() => navigate('/admin-dashboard/warehouse-management/create-warehouse')}
              >
                <Flex
                  justifyContent={'center'}
                  alignItems={'center'}
                  padding={'12px 16px'}
                  gap={'10px'}
                >
                  <Icon as={PlusIcon} boxSize={{base: '18px', md: '24px'}} />
                  <Text fontSize={{base: '12px', md:'14px'}} fontWeight={'700'}>
                    Create Warehouse
                  </Text>
                </Flex>
              </Button>
            </Flex>
            
              <Flex mb={'20px'}>
                <BreadCrumbs />
              </Flex>
            
          </Box>

          <Box display={{ base: 'none', md: 'block' }}>
            <Flex justifyContent={'space-between'}>
              <Flex>
                <Text fontSize={'24px'} fontWeight={'700'}>
                  Warehouse List
                </Text>
              </Flex>
              <Flex justifyContent={'flex-end'} gap={'12px'}>
                <Button
                  bg={'green'}
                  color={'white'}
                  _hover={{ bg: '#f50f5a' }}
                  _active={{ opacity: '70%' }}
                  minW={'185px'}
                  h={'48px'}
                  display={'flex'}
                  onClick={() => navigate('/warehouse-management/create-warehouse')}
                >
                  <Flex
                    justifyContent={'center'}
                    alignItems={'center'}
                    padding={'12px 16px'}
                    gap={'10px'}
                  >
                    <Icon as={PlusIcon} boxSize={'24px'} />
                    <Text fontSize={'14px'} fontWeight={'700'}>
                      Create Warehouse
                    </Text>
                  </Flex>
                </Button>
              </Flex>
            </Flex>
            <Flex>
              <BreadCrumbs />
            </Flex>
          </Box>
        </Box>
        <Box className="table">
          <TableWarehouse
            warehouse={warehouse}
            onWarehouseUpdated={fetchWarehouseList}
          />
        </Box>
        {/* <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          pageSize={pageSize}
          totalRecords={totalRecords}
        /> */}
      </Box>
    </Box>
  )
}

export default WarehouseList