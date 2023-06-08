import  { Flex, Spinner } from '@chakra-ui/react'

const Loader = () => {
    
    return (
        <Flex justifyContent={'center'} flex={1} height={'100%'} direction={'column'} alignItems={'center'}>
          <Spinner size="md" />
        </Flex>
    )
}

export default Loader
