import { Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { deleteAccountFunction } from "../../services/deleteAccount"

function DeleteAccount ({id, onDeletedAdmin}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleDeleteAccount = async () => {
        try{
            await deleteAccountFunction(id)
            onDeletedAdmin()
            onClose()
        }catch (err){
            console.log(err.message);
        }
    }
  return (
    <>
        <Button
        onClick={onOpen}
        variant={'outline'}
        border={'1px solid '}
        color={'red'}
        fontSize={'12px'}
        fontWeight={'700'}
        padding={'4px 16px'}
        w={'auto'}
        _hover={'none'}
        _active={'none'}
      >
        Delete
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
        <Flex flexDir={'column'} justify={'center'} align={'center'} margin={'24px 24px 8px'}>
        <ModalBody fontWeight={'700'}>
            Are you sure you want to delete this account?
        </ModalBody>
        <ModalFooter display={'flex'} flexDir={'column'} gap={'10px'}>
            <Button 
            variant='outline' borderColor={'green'}
            color={'green'}
            _hover={{bg: '#f50f5a'}} 
            _active={{opacity:'70%'}} 
            onClick={onClose} 
            fontSize={'14px'}>
              No
            </Button>
            <Button variant='outline' 
            fontSize={'14px'}
            borderColor={'red'}
            color={'red'}
            _hover={{bg: 'white', borderColor:'#f50f5a'}} 
            _active={{opacity:'70%'}}
            onClick={handleDeleteAccount}>
                Yes, I wanna delete it
            </Button>
        </ModalFooter>
        </Flex>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteAccount