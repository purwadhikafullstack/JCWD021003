import {
    Table,
    TableContainer,
    Td,
    Thead,
    Tr,
    Text,
    Tbody,
    Box,
    Icon,
    Button,
    Avatar,
    Th,
  } from '@chakra-ui/react';
  // import EditAdmin from '../edit-admin';
  import DeleteAccount from '../remove Account';
//   import EditAccount from '../edit Account';
  
  function UserList({ user, onUserUpdated }) {
    console.log('user', user);
    return (
      <>
        <div>
          {user.length > 0 ? (
            <TableContainer>
              <Table size="sm" bgcolor="white" borderRadius={'20px'}>
                <Thead>
                  <Tr>
                    <Th p={'20px 10px 5px 10px'} textAlign={'center'}>Username</Th>
                    <Th  p={'20px 20px 5px 20px'}textAlign={'center'}>Email</Th>
                    <Th p={'20px 20px 5px 20px'} textAlign={'center'}>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {user.map((user, index) => (
                    <Tr key={index}>
                      <Td textAlign={'center'}>{user.username}</Td>
                      <Td textAlign={'center'}>{user.email}</Td>
                      <Td >
                    <Box display={'flex'} gap={'8px'} justifyContent={'center'}>
                      <DeleteAccount id={user.id} onDeletedAdmin={onUserUpdated}/>
                    </Box>
                  </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <p>No admin data available.</p>
          )}
        </div>
      </>
    );
  }
  
  export default UserList;
  