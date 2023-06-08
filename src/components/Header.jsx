import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

const Header = () => {
  return (
    <Flex justifyContent={'center'} mb={10} flexDirection={'column'} alignItems={'center'}>
        <Text fontSize={'xl'} fontWeight={'bold'}>TOPSY</Text>
        <Text fontSize={'md'} mt={2} fontWeight={'medium'}>presents</Text>
        <Text fontSize={'xl'} variant={'h1'} mt={7} fontWeight={'bold'}>Scoopy Woo</Text>
    </Flex>
  )
}

export default Header