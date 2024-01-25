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
    Icon, useToast} from '@chakra-ui/react'
import { useFormik } from "formik";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronRightIcon } from '@chakra-ui/icons'
import {useState, useEffect} from 'react'
import { setUser, updateUser } from '../../../../redux/reducer/authReducer';


function UpdateUsername() {
  const user = useSelector((state) => state.AuthReducer.user);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch();
  const toast = useToast()

  const editUsername = async (
    username
  ) => {
    try{ 
      await axios.patch(`http://localhost:8000/api/user/update-username/${user.id}`, {
      username,
    });
    dispatch(setUser({...user, username}))
    toast({
      title: "Username successfully changed",
      status: "success",
    });
    onClose();
    } catch (err){
      console.log(err)
    }
  };



  const formik = useFormik({
    initialValues:{
    username: user.username,
    },

    onSubmit: (values) => {
      editUsername(values.username,)
      formik.resetForm()
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
                        <span>{user.username}</span>   
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
                    <ModalHeader>Edit Username</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                      <FormControl isInvalid={!!(
                      formik.touched.username && formik.errors.username)}>
                        <FormLabel>Username</FormLabel>
                        <Input name="username"
                        // placeholder='Enter username'
                        value={formik.values.username}
                        onChange={(e)=>{formik.handleChange(e)}} />

                        {formik.touched.username && formik.errors.username && (
                          <FormErrorMessage>
                            {formik.errors.username}
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

export default UpdateUsername

