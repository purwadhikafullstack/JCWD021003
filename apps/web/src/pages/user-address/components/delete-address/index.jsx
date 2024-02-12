import { Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { deleteUserAddress } from "../../services/deleteUserAddress"
import toast from "react-hot-toast"

function DeleteUserAddress ({id, onDeletedAddress}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleDeleteAddress = async () => {
        try{
            await deleteUserAddress(id)
            onDeletedAddress()
            onClose()
            toast.success('Address deleted successfully')
        }catch (err){
          toast.error('Error deleting')
            console.log(err.message);
        }
    }
  return (
    <>
        <Box onClick={onOpen}
        fontSize={'14px'}
        fontWeight={'700'}>
            Delete Address
        </Box>

      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent w={'80%'}>
        <Flex flexDir={'column'} justify={'center'} align={'center'} margin={'24px 24px 8px'}>
        <ModalHeader fontSize={'25px'} fontWeight={700}>Delete Address</ModalHeader>
        <ModalBody color={'grey'} fontWeight={'400'} fontSize={'17px'}>
            Are you sure you want to delete this address?
        </ModalBody>
        <ModalFooter display={'flex'} flexDir={'row'} gap={'10px'}>
            <Button 
            color={'green'}
            _hover={{bg: '#f50f5a'}} 
            _active={{opacity:'70%'}} 
            onClick={onClose} 
            fontSize={'14px'}
            variant='outline'
            borderColor={'green'}>
              Cancel
            </Button>
            <Button  
            fontSize={'14px'}
            bgColor={'green'}
            color={'white'}
            _hover={{bg: 'white', borderColor:'#f50f5a'}} 
            _active={{opacity:'70%'}}
            onClick={handleDeleteAddress}>
                Delete
            </Button>
        </ModalFooter>
        </Flex>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteUserAddress