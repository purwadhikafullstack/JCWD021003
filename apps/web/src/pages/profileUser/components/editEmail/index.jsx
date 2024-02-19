import { 
    Button, 
    Input, 
    useDisclosure,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalFooter,
    FormControl,
    FormLabel, 
    Text,
    Select,
    Link,
    FormErrorMessage,
    Icon,
    Flex} from '@chakra-ui/react'
import { useFormik } from "formik";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronRightIcon } from '@chakra-ui/icons'
import {CheckBadgeIcon} from '@heroicons/react/24/solid'
import toast from 'react-hot-toast';
import { setUser } from '../../../../redux/reducer/authReducer';

function UpdateEmail() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const user = useSelector((state) => state.AuthReducer.user);
  const dispatch = useDispatch()

  const editEmail = async (email) => {
    try{ 
      await axios.patch(`${import.meta.env.VITE_API_URL}user/update-email/${user.id}`, {
      email,
    });
    toast.success('Update email is successful. Check your Email to verify your email')
    onClose();
    dispatch(setUser({ ...user, email, isVerified: false }));
    } catch (err){
      toast.error("Failed to update email.");
      console.log(err)
    }
  };

  const formik = useFormik({
    initialValues:{
    email: user.email,
    },

    onSubmit: (values) => {
      editEmail(
          values.email,
          )
        }
      });

      

  return (
    <>
        <Button w={'100%'}
                    display="flex" 
                    justifyContent="space-between" 
                    alignItems="center"
                    bg={'transparent'}
                    fontWeight={'500'}
                    onClick={onOpen}>
                        <Flex alignItems={'center'}
                        gap={'5'}>{user?.email}
                        {user?.isVerified ? (
                        <Flex alignItems={'center'}
                        gap={'4px'}>
                            <Icon as={CheckBadgeIcon} color={'blue'} boxSize={'16px'}/>
                            <Text fontSize={'14px'} color={'green'}>Verified</Text>
                        </Flex>
                        ): (
                            <Text fontSize={'14px'} color={'green'}>Verify Email</Text>
                        )}
                        </Flex>
                        <span>
                            <Icon as={ChevronRightIcon}/>
                        </span>   
                <Modal
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  
                  <ModalOverlay />
                  <form onSubmit={formik.handleSubmit}>
                  <ModalContent>
                    <ModalHeader>Edit Email</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                    <FormControl isInvalid={!!(
                      formik.touched.email && formik.errors.email)}>
                        <FormLabel>Email</FormLabel>
                        <Input name="email"
                        // placeholder='Enter email'
                        type='email'
                        value={formik.values.email}
                        onChange={formik.handleChange} />

                        {formik.touched.email && formik.errors.email && (
                          <FormErrorMessage>
                            {formik.errors.email}
                          </FormErrorMessage>
                        )}
                      </FormControl>

                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme='blue' mr={3} type='submit'>
                        Save
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                  </form>
                </Modal>

        </Button>
    </>
  )
}

export default UpdateEmail

