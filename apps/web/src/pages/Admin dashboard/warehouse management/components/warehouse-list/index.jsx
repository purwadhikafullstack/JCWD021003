import {    Table,    TableContainer,    Td,    Thead,    Tr,
    Text,    Tbody,    Box,    Icon,    Button,    Avatar,    Flex,
    Menu,    MenuButton,    MenuList,    MenuItem,  } from '@chakra-ui/react'
//   import DeleteWarehouse from '../delete-warehouse'
  import { ChevronDownIcon } from '@chakra-ui/icons'
  import { useNavigate } from 'react-router-dom'
  
  function TableWarehouse({ warehouse, onWarehouseUpdated }) {
    const navigate = useNavigate()
    console.log('data warehouse',warehouse)
    
    return (
      <>
        <TableContainer borderRadius={'12px'} mx={'7%'}>
          <Table size={{base: 'sm', md:'md'}}>
            <Thead bgColor={'green'}>
              <Tr>
                <Td padding={'8px'} borderRight={'1px solid white'} >
                    <Text  color={'white'} fontWeight={'700'} fontSize={'14px'}>
                      Name
                    </Text>
                </Td>
                <Td padding={'8px 8px 8px 16px'}>
                  <Text textAlign={'center'} color={'white'} fontWeight={'700'} fontSize={'14px'}>
                    Location
                  </Text>
                </Td>
                <Td padding={'8px 8px 8px 16px'}>
                  <Text  textAlign={'center'}color={'white'} fontWeight={'700'} fontSize={'14px'}>
                    City
                  </Text>
                </Td>
                <Td padding={'8px 8px 8px 16px'}  borderRight={'1px solid white'}>
                    <Text textAlign={'center'} color={'white'} fontWeight={'700'} fontSize={'14px'}>
                      Province
                    </Text>
                </Td>
                {/* <Td padding={'8px 8px 8px 16px'}>
                  <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>
                    Admin Management
                  </Text>
                </Td> */}
                <Td padding={'8px'}>
                  <Text textAlign={'center'} color={'white'} fontWeight={'700'} fontSize={'14px'}>
                    Action
                  </Text>
                </Td>
              </Tr>
            </Thead>
            <Tbody fontSize={'14px'}>
              {warehouse?.map((warehouse, index) => (
                <Tr key={warehouse.id} bg={index % 2 === 0 ? 'white' : 'green.100'}>
                  <Td padding={'8px 8px 8px 16px'}>{warehouse.name}</Td>
                  <Td padding={'8px 8px 8px 16px'}>
                    <Text isTruncated textAlign={'center'}>{warehouse.WarehouseAddress?.location}</Text>
                  </Td>
                  <Td textAlign={'center'} maxW={'250px'} padding={'8px 8px 8px 16px'}>
                  {warehouse.WarehouseAddress?.City?.name}
                  </Td>
                  <Td padding={'8px 8px 8px 16px'}>
                    <Text textAlign={'center'}>  {warehouse.WarehouseAddress?.City?.Province.name}</Text>
                  </Td>
                  <Td padding={'8px 8px 8px 16px'}>
                    <Box display={'flex'} gap={'8px'} justifyContent={'center'}>
                    
                      <Button
                        onClick={() => {navigate('/warehouse-management/edit-warehouse', {state: {warehouse}})}}
                        bg={'green'}
                        color={'white'}
                        fontSize={'12px'}
                        fontWeight={'700'}
                        padding={'4px 16px'}
                        w={'72px'}
                        _hover={'none'}
                        _active={'none'}
                      >
                        Edit
                      </Button>
                      {/* <EditWarehouse
                        id={warehouse.id}
                        name={warehouse.name}
                        onWarehouseUpdated={onWarehouseUpdated}
                      /> */}
                      {/* <DeleteWarehouse id={warehouse.id} onDeletedWarehouse={onWarehouseUpdated} /> */}
                    </Box>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </>
    )
  }
  
  export default TableWarehouse