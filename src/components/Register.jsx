import React from 'react'
import { Flex, Button } from '@chakra-ui/react'

const Register = () => {
  return ( 
    <Flex mt={10} justifyContent={'center'} alignItems={'center'}>
        <Button color={'black'} bgColor={'yellow.400'} onClick={() => window.location.replace('https://docs.google.com/forms/d/1F7mPHyHj7_maYLYTyltrlKr7qZZc9ikaZxgTXuP35P4/edit')}>Register Now</Button>
    </Flex>
  )
}

export default Register