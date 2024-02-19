import {
    Button,    Modal,    ModalBody,    ModalCloseButton,    ModalContent,
    ModalFooter,    ModalHeader,    ModalOverlay,    useDisclosure,
    Text,    Input,    InputGroup,    InputRightElement,    Icon,
    Select,  } from '@chakra-ui/react'
  import { editAccount } from '../../services/editAccount'
  import { useFormik } from 'formik'
  import { useState,useEffect } from 'react'
  import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
  import { getWarehouseList } from './services/getWarehouse'
  import toast from 'react-hot-toast'
  
  function EditAccount ({ id, username, email, roleId,warehouse, onAdminUpdated }) {
    const [WarehouseList, setWarehouseList] = useState([])
    const [selectedWarehouse, setSelectedWarehouse] = useState(warehouse || '')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
      getWarehouseList().then((data) => {
        setWarehouseList(data)
      })
    }, [])

    const formik = useFormik({
      initialValues: {
        username: username || '',
        email: email || '',
        password: '',
        roleId: roleId || '',
        warehouse: warehouse || '',
      },
      onSubmit: async (values) => {
        try {
          await editAccount(id, values.username, values.email, values.password, values.roleId, values.warehouse)
          toast.success('Updated account success')
          onAdminUpdated()
        } catch (err) {
          toast.error('Failed to update user account.');
        }
      },
    })
    return (
      <>
        <Button
          onClick={onOpen}
          bg={'green'}
          color={'white'}
          fontSize={'12px'}
          fontWeight={'700'}
          padding={'4px 16px'}
          w={'auto'}
          _hover={'none'}
          _active={'none'}
        >
          Edit
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <form onSubmit={formik.handleSubmit}>
          <ModalContent>
            <ModalHeader>Edit Account</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
                Username
              </Text>
              <Input
                name="username"
                bg={'brand.grey100'}
                variant={'filled'}
                mb={'32px'}
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
                Email
              </Text>
              <Input
                name="email"
                bg={'brand.grey100'}
                variant={'filled'}
                mb={'32px'}
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
                Password
              </Text>
              <InputGroup>
                <Input
                  name="password"
                  bg={'brand.grey100'}
                  variant={'filled'}
                  mb={'32px'}
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <InputRightElement>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}
                    backgroundColor={'transparent'}
                  >
                    {showPassword ? <Icon as={EyeIcon} /> : <Icon as={EyeSlashIcon} />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
                Role
              </Text>
              <Select name="roleId"
                bg={'brand.grey100'}
                variant={'filled'}
                mb={'32px'}
                value={formik.values.roleId}
                onChange={formik.handleChange}>
                  <option value='2'>Warehouse Admin</option>
              </Select>
              <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
                      Warehouse
                    </Text>
                    <Select
                      name='warehouse'
                      placeholder="Warehouse"
                      bg={'brand.grey100'}
                      variant={'filled'}
                      mb={'24px'}
                      onChange={formik.handleChange}
                      value={formik.values.warehouse}
                    >
                      {WarehouseList?.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id}>
                          {warehouse.name}
                        </option>
                      ))}
                    </Select>
              
            </ModalBody>
            <ModalFooter>
              <Button
                width={'168px'}
                padding={'12px 16px'}
                bgColor={'white'}
                color={'red'}
                variant={'outline'}
                borderColor={'red'}
                _hover={{ borderColor: '#f50f5a', color: '#f50f5a' }}
                _active={{ opacity: '70%' }}
                mr={3}
                onClick={onClose}
              >
                Cancel
              </Button>
  
              <Button
                type="submit"
                width={'168px'}
                padding={'12px 16px'}
                bgColor={'green'}
                color={'white'}
                _hover={{ bg: '#f50f5a' }}
                _active={{ opacity: '70%' }}
                onClick={onClose}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
          </form>
        </Modal>
      </>
    )
  }
  
  export default EditAccount