import { Button, Flex, Icon, Text } from '@chakra-ui/react'
import { PlusIcon } from '@heroicons/react/24/outline'

function CreateUser() {
  return (
    <>
      <Button
        bg={'green'}
        color={'white'}
        _hover={{ bg: 'white', color: 'green' }}
        _active={{ opacity: '70%' }}
        minW={'168px'}
        h={'48px'}
        display={'flex'}
        // onClick={() => navigate('/create-account')}
      >
        <Flex justifyContent={'center'} alignItems={'center'} padding={'12px 16px'} gap={'10px'}>
          <Icon as={PlusIcon} boxSize={'24px'} />
          <Text fontSize={'14px'} fontWeight={'700'}>
            Create User
          </Text>
        </Flex>
      </Button>
    </>
  )
}

export default CreateUser