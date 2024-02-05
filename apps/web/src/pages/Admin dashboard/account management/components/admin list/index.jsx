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
import EditAccount from '../edit Account';

function AdminList({ admin, onAdminUpdated }) {
  console.log('admin', admin);
  return (
    <>
      <div>
        {admin.length > 0 ? (
          <TableContainer>
            <Table size="sm" bgcolor="white" borderRadius={'20px'}>
              <Thead>
                <Tr>
                  <Th p={'20px 10px 5px 10px'} textAlign={'center'}>
                    Username
                  </Th>
                  <Th p={'20px 20px 5px 20px'} textAlign={'center'}>
                    Email
                  </Th>
                  <Th p={'20px 20px 5px 20px'} textAlign={'center'}>
                    Role
                  </Th>
                  <Th p={'20px 20px 5px 20px'} textAlign={'center'}>
                    Warehouse
                  </Th>
                  <Th p={'20px 20px 5px 20px'} textAlign={'center'}>
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {admin.map((user, index) => (
                  <Tr key={index}>
                    <Td>{user.username}</Td>
                    <Td>{user.email}</Td>
                    <Td>
                      {' '}
                      {user.roleId === 1
                        ? 'Super Admin'
                        : user.roleId === 2
                          ? 'Warehouse Admin'
                          : 'Unknown Role'}{' '}
                    </Td>
                    <Td>
                      {user.Warehouses.length > 0
                        ? user.Warehouses[0].name
                        : ''}
                    </Td>{' '}
                    <Td>
                      <Box display={'flex'} gap={'8px'}>
                        <EditAccount
                          id={user.id}
                          username={user.username}
                          email={user.email}
                          roleId={user.roleId}
                          onAdminUpdated={onAdminUpdated}
                        />
                        <DeleteAccount
                          id={user.id}
                          onDeletedAdmin={onAdminUpdated}
                        />
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

export default AdminList;
