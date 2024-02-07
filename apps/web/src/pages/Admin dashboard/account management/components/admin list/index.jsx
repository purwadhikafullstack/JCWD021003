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
                  <Td textAlign={'center'}>{user.username}</Td>
                  <Td textAlign={'center'}>{user.email}</Td>
                  <Td textAlign={'center'}>
                    {' '}
                    {user.roleId === 1
                      ? 'Super Admin'
                      : user.roleId === 2
                        ? 'Warehouse Admin'
                        : 'Unknown Role'}{' '}
                  </Td>
                  <Td textAlign={'center'}>
                    {user.Warehouse && user.Warehouse.name
                      ? user.Warehouse.name
                      : ''}
                  </Td>
                  <Td >
                    <Box display={'flex'} gap={'8px'}  justifyContent={'center'}>
                      <EditAccount
                        id={user.id}
                        username={user.username}
                        email={user.email}
                        roleId={user.roleId}
                        warehouse={user.Warehouse ? user.Warehouse.id : ''}
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
      </div>
    </>
  );
}

export default AdminList;
