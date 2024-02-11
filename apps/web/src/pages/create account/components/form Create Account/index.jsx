import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreateAccount } from '../../services/createAccount';
import { SuccessModal, ErrorModal } from './popModal/popModal';

function FormCreateAccount() {
  const {
    isOpen: isSuccessModalOpen,
    onOpen: openSuccessModal,
    onClose: closeSuccessModal,
  } = useDisclosure();
  const {
    isOpen: isErrorModalOpen,
    onOpen: openErrorModal,
    onClose: closeErrorModal,
  } = useDisclosure();
  const [selectedRole, setSelectedRole] = useState('');
  // const user = useSelector((state) => state.AuthReducer.user);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      roleId: '',
    },
    onSubmit: async (values) => {
      try {
        console.log('Formik Submission Values:', values);
        await CreateAccount(
          values.username,
          values.email,
          values.password,
          values.roleId,
          openSuccessModal,
          openErrorModal,
        );
        formik.resetForm();
      } catch (err) {
        console.log(err.message);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Flex>
          <Box mr={'40px'}>
            <Text fontWeight={700}>Username</Text>
            <Input
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              variant={'filled'}
              placeholder="Username"
              mb={'20px'}
            />

            <Text fontWeight={700}>Role</Text>
            <Select
              name="roleId"
              variant={'filled'}
              placeholder="Select Account Role"
              onChange={formik.handleChange}
              value={formik.values.roleId}
            >
              <option value="1">Super Admin</option>
              <option value="2">Warehouse Admin</option>
              <option value="3">Buyer</option>
            </Select>
          </Box>
          <Box w={'60%'}>
            <Text fontWeight={700}>Email</Text>
            <Input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              variant={'filled'}
              w={'70%'}
              placeholder="Email"
              mb={'20px'}
            />

            <Text fontWeight={700}>Password</Text>
            <Input
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              variant={'filled'}
              placeholder="Password"
              mb={'20px'}
              w={'70%'}
            />

            <Box display="flex" justifyContent="flex-end">
              <Button colorScheme="red" type="submit" ml={'1px'}>
                Save
              </Button>
              <Button
                colorScheme="red"
                onClick={() => navigate(-1)}
                ml={'10px'}
              >
                Cancel
              </Button>
            </Box>

            <SuccessModal
              isOpen={isSuccessModalOpen}
              onClose={closeSuccessModal}
            />
            <ErrorModal isOpen={isErrorModalOpen} onClose={closeErrorModal} />
          </Box>
        </Flex>
      </form>
    </>
  );
}

export default FormCreateAccount;
