import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
export const SuccessModal = ({ isOpen, onClose }) => {
    
    return (
      <>
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign={'center'} color={'green'} fontSize={'32px'}>Success!</ModalHeader>
            <ModalBody>
            "The address has been successfully created."
            </ModalBody>
            <ModalFooter>
              <Button bg='green' color='white' _hover={{bg: '#f50f5a'}} mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  };

  export const ErrorModal = ({ isOpen, onClose }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size={'sm'} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'} color={'red.500'} fontSize={'32px'}>Failed!</ModalHeader>
          <ModalBody textAlign={'center'} >
            Please fill the form correctly
          </ModalBody>
          <ModalFooter>
              <Button bg='green' color='white' _hover={{bg: '#f50f5a'}} mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }