import { Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { deleteWarehouseFunction } from "../services/deleteWarehouse"
import { IoCloseOutline } from 'react-icons/io5'
function DeleteWarehouse ({id, onDeletedWarehouse}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleDeleteAdmin = async () => {
        try{
            await deleteWarehouseFunction(id)
            onDeletedWarehouse()
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
        border={'1px solid red'}
        color={'red'}
        fontSize={'12px'}
        fontWeight={'700'}
        _hover={''}
        _active={''}
      >
        <IoCloseOutline  />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
        <Flex flexDir={'column'} justify={'center'} align={'center'} margin={'24px 24px 8px'}>
        <ModalBody fontWeight={'700'}>
            Are you sure you want to delete this warehouse?
        </ModalBody>
        <ModalFooter display={'flex'} flexDir={'column'} gap={'10px'}>
            <Button bg={'white'}
            color={'red'}
            border={'1px solid red'}
            _hover={{bg: '#f50f5a'}} 
            _active={{opacity:'70%'}} 
            onClick={onClose} 
            fontSize={'14px'}>
              No!
            </Button>
            <Button 
            fontSize={'14px'}
            color={'white'}
            bgColor={'red'}
            _hover={{bg: 'white', borderColor:'#f50f5a'}} 
            _active={{opacity:'70%'}}
            onClick={handleDeleteAdmin}>
                Yes, I wanna delete it
            </Button>
        </ModalFooter>
        </Flex>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteWarehouse